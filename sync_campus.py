#!/usr/bin/env python3
"""
sync_campus.py — Sincronización con EVA FING (Moodle)
Genera notifications.js para el dashboard de EstudioFING

Uso:
    python sync_campus.py

La primera vez te pide usuario y contraseña y los guarda en campus_config.json.
"""

import sys
import json
import subprocess
from datetime import datetime, timedelta, timezone
from pathlib import Path

try:
    import requests
except ImportError:
    print("Instalando requests...")
    subprocess.run([sys.executable, "-m", "pip", "install", "requests"], check=True)
    import requests

# ── Configuración ─────────────────────────────────────────────
MOODLE_URL  = "https://eva.fing.edu.uy"
SCRIPT_DIR  = Path(__file__).parent
CONFIG_FILE = SCRIPT_DIR / "campus_config.json"
NOTIF_FILE  = SCRIPT_DIR / "notifications.js"
CACHE_FILE  = SCRIPT_DIR / ".grades_cache.json"

CURSOS = {
    "Prog2":    {"nombre": "Programación 2",   "carpeta": "P 2"  },
    "CDIVV-1S": {"nombre": "Cálculo II",        "carpeta": "CDIVV"},
    "GAL2-1S":  {"nombre": "Álgebra Lineal II", "carpeta": "GAL 2"},
    "MD2-1S":   {"nombre": "Discreta 2",        "carpeta": "MD 2" },
}

DIAS_ALERTA  = 7    # Avisar tareas/foros que vencen en los próximos N días
MAX_FILESIZE = 50   # No descargar archivos > N MB automáticamente


# ── Cliente Moodle ────────────────────────────────────────────
class MoodleClient:
    def __init__(self, url: str, token: str):
        self.url     = url.rstrip("/")
        self.token   = token
        self.ws_url  = f"{self.url}/webservice/rest/server.php"
        self.session = requests.Session()
        self.session.headers["User-Agent"] = "EstudioFING/1.0"

    def call(self, function: str, **params) -> dict | list:
        data = {"wstoken": self.token, "wsfunction": function, "moodlewsrestformat": "json"}
        data.update(params)
        r = self.session.post(self.ws_url, data=data, timeout=30)
        r.raise_for_status()
        result = r.json()
        if isinstance(result, dict) and "exception" in result:
            raise Exception(result.get("message", str(result)))
        return result

    def download(self, url: str, dest: Path):
        sep      = "&" if "?" in url else "?"
        full_url = f"{url}{sep}token={self.token}"
        r        = self.session.get(full_url, timeout=60, stream=True)
        r.raise_for_status()
        dest.parent.mkdir(parents=True, exist_ok=True)
        with open(dest, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)


def get_token(url: str, usuario: str, contrasena: str) -> str:
    r    = requests.post(f"{url.rstrip('/')}/login/token.php",
                         data={"username": usuario, "password": contrasena,
                               "service": "moodle_mobile_app"}, timeout=20)
    data = r.json()
    if "token" not in data:
        raise Exception(data.get("error") or data.get("debuginfo") or str(data))
    return data["token"]


# ── Config ────────────────────────────────────────────────────
def load_config() -> dict:
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text())
    print("Primera vez: guardando credenciales en campus_config.json (gitignoreado)\n")
    config = {
        "usuario":    input("Usuario EVA FING: ").strip(),
        "contrasena": input("Contraseña EVA FING: ").strip(),
    }
    CONFIG_FILE.write_text(json.dumps(config, indent=2))
    return config


# ── Helpers ───────────────────────────────────────────────────
def ts(t: int) -> datetime:
    return datetime.fromtimestamp(t, tz=timezone.utc).astimezone()

def ahora() -> datetime:
    return datetime.now().astimezone()

def fmt(dt: datetime) -> str:
    return dt.strftime("%d/%m/%Y %H:%M")

def dias_para(dt: datetime) -> int:
    return (dt.date() - ahora().date()).days

def notif(tipo, titulo, mensaje, materia) -> dict:
    return {"tipo": tipo, "titulo": titulo, "mensaje": mensaje, "materia": materia}


# ── Obtener IDs de cursos ─────────────────────────────────────
def get_courses(client: MoodleClient) -> tuple[dict, int]:
    info     = client.call("core_webservice_get_site_info")
    userid   = info["userid"]
    enrolled = client.call("core_enrol_get_users_courses", userid=userid)
    ids      = {c["shortname"]: c["id"] for c in enrolled if c["shortname"] in CURSOS}
    return ids, userid


# ── Foros ─────────────────────────────────────────────────────
def check_foros(client: MoodleClient, course_ids: dict) -> list[dict]:
    result = []
    for short, cid in course_ids.items():
        nombre = CURSOS[short]["nombre"]
        try:
            forums = client.call("mod_forum_get_forums_by_courses", **{"courseids[0]": cid})
        except Exception as e:
            print(f"  [!] Foros {short}: {e}")
            continue

        for forum in forums:
            try:
                data = client.call("mod_forum_get_forum_discussions",
                                   forumid=forum["id"], page=0, perpage=20)
            except:
                continue

            for disc in data.get("discussions", []):
                timeend = disc.get("timeend", 0)
                if not timeend:
                    continue
                dt_end = ts(timeend)
                dias   = dias_para(dt_end)
                if 0 <= dias <= DIAS_ALERTA:
                    tipo = "danger" if dias <= 2 else "warning"
                    result.append(notif(tipo,
                        f"Foro vence en {dias} día{'s' if dias != 1 else ''}",
                        f"{disc['name']} — {fmt(dt_end)}", nombre))
    return result


# ── Tareas ────────────────────────────────────────────────────
def check_tareas(client: MoodleClient, course_ids: dict, userid: int) -> list[dict]:
    result    = []
    cids_args = {f"courseids[{i}]": v for i, v in enumerate(course_ids.values())}
    try:
        data = client.call("mod_assign_get_assignments", **cids_args)
    except Exception as e:
        print(f"  [!] Tareas: {e}")
        return result

    for course in data.get("courses", []):
        short  = next((k for k, v in course_ids.items() if v == course["id"]), None)
        if not short:
            continue
        nombre = CURSOS[short]["nombre"]

        for assign in course.get("assignments", []):
            duedate = assign.get("duedate", 0)
            titulo  = assign["name"]

            # Estado de entrega
            entregada = False
            try:
                st_data   = client.call("mod_assign_get_submission_status",
                                        assignid=assign["id"], userid=userid)
                sub       = st_data.get("lastattempt", {}).get("submission", {})
                entregada = sub.get("status", "") in ("submitted", "graded") if sub else False
            except:
                pass

            if not duedate:
                continue

            dt_due = ts(duedate)
            dias   = dias_para(dt_due)

            if dt_due < ahora() and not entregada:
                result.append(notif("danger", "Tarea vencida sin entregar",
                    f"{titulo} — venció el {fmt(dt_due)}", nombre))
            elif 0 <= dias <= DIAS_ALERTA and not entregada:
                tipo = "danger" if dias <= 2 else "warning"
                result.append(notif(tipo,
                    f"Tarea vence en {dias} día{'s' if dias != 1 else ''}",
                    f"{titulo} — {fmt(dt_due)}", nombre))
            elif entregada:
                result.append(notif("success", "Tarea entregada", titulo, nombre))

    return result


# ── Materiales nuevos ─────────────────────────────────────────
def check_materiales(client: MoodleClient, course_ids: dict) -> list[dict]:
    result      = []
    hace_7_dias = int((ahora() - timedelta(days=7)).timestamp())

    for short, cid in course_ids.items():
        nombre  = CURSOS[short]["nombre"]
        carpeta = SCRIPT_DIR / CURSOS[short]["carpeta"] / "Material"
        try:
            sections = client.call("core_course_get_contents", courseid=cid)
        except Exception as e:
            print(f"  [!] Contenido {short}: {e}")
            continue

        for section in sections:
            for module in section.get("modules", []):
                if module.get("timemodified", 0) <= hace_7_dias:
                    continue
                for content in module.get("contents", []):
                    if content.get("type") != "file":
                        continue
                    filename = content["filename"]
                    fileurl  = content.get("fileurl", "")
                    filesize = content.get("filesize", 0)
                    dest     = carpeta / filename

                    if dest.exists():
                        continue

                    if filesize > MAX_FILESIZE * 1024 * 1024:
                        result.append(notif("info", "Material nuevo (muy grande, no descargado)",
                            f"{module['name']} — {filename} ({filesize//1024//1024} MB)", nombre))
                        continue

                    print(f"  → Descargando {filename}...")
                    try:
                        client.download(fileurl, dest)
                        result.append(notif("info", "Material nuevo descargado",
                            f"{module['name']} — {filename}", nombre))
                    except Exception as e:
                        print(f"    [!] Error: {e}")
                        result.append(notif("info", "Material nuevo (error al descargar)",
                            f"{filename}", nombre))
    return result


# ── Parciales en secciones ─────────────────────────────────────
def check_parciales(client: MoodleClient, course_ids: dict) -> list[dict]:
    result   = []
    keywords = ["parcial", "examen", "exam", "prueba", "evaluación", "evaluacion"]

    for short, cid in course_ids.items():
        nombre = CURSOS[short]["nombre"]
        try:
            sections = client.call("core_course_get_contents", courseid=cid)
        except:
            continue
        for section in sections:
            name_lower = section.get("name", "").lower()
            if any(kw in name_lower for kw in keywords):
                result.append(notif("info", "Sección de examen en el campus",
                    section.get("name", ""), nombre))
    return result


# ── Calificaciones ─────────────────────────────────────────────
def check_calificaciones(client: MoodleClient, course_ids: dict, userid: int) -> list[dict]:
    result = []
    try:
        cache = json.loads(CACHE_FILE.read_text()) if CACHE_FILE.exists() else {}
    except:
        cache = {}

    new_cache = {}

    for short, cid in course_ids.items():
        nombre = CURSOS[short]["nombre"]
        try:
            data  = client.call("gradereport_user_get_grade_items", courseid=cid, userid=userid)
            items = data.get("usergrades", [{}])[0].get("gradeitems", [])
        except Exception as e:
            print(f"  [!] Notas {short}: {e}")
            continue

        for item in items:
            graderaw = item.get("graderaw")
            if graderaw is None:
                continue
            iid      = str(item.get("id", ""))
            itemname = item.get("itemname") or "Ítem"
            new_cache[iid] = graderaw

            if iid not in cache:
                result.append(notif("success", "Nueva calificación",
                    f"{itemname}: {graderaw}", nombre))
            elif cache[iid] != graderaw:
                result.append(notif("success", "Calificación actualizada",
                    f"{itemname}: {cache[iid]} → {graderaw}", nombre))

    CACHE_FILE.write_text(json.dumps(new_cache, indent=2))
    return result


# ── Escribir notifications.js ─────────────────────────────────
def write_notifications(notifs: list[dict]):
    ts_str = ahora().strftime("%d/%m/%Y %H:%M")
    js = f"""// Generado automáticamente por sync_campus.py — {ts_str}
// No editar a mano. Ejecutá: python sync_campus.py
const NOTIFICATIONS = {json.dumps(notifs, ensure_ascii=False, indent=2)};
const NOTIFICATIONS_UPDATED = "{ts_str}";
"""
    NOTIF_FILE.write_text(js, encoding="utf-8")
    print(f"\n✓ {len(notifs)} notificación{'es' if len(notifs) != 1 else ''} → notifications.js")


# ── Git push automático ───────────────────────────────────────
def git_push():
    try:
        subprocess.run(["git", "add", "notifications.js"], cwd=SCRIPT_DIR, check=True)
        changed = subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=SCRIPT_DIR)
        if changed.returncode != 0:
            ts_str = ahora().strftime("%Y-%m-%d %H:%M")
            subprocess.run(["git", "commit", "-m", f"sync campus {ts_str}"],
                           cwd=SCRIPT_DIR, check=True)
            subprocess.run(["git", "push"], cwd=SCRIPT_DIR, check=True)
            print("✓ Notificaciones publicadas en la app")
        else:
            print("  (notificaciones sin cambios, no se publicó)")
    except subprocess.CalledProcessError as e:
        print(f"  [!] Error al publicar: {e}")


# ── Main ──────────────────────────────────────────────────────
def main():
    print("=" * 52)
    print("   EstudioFING — Sync Campus EVA FING")
    print("=" * 52)

    config = load_config()
    print(f"\n→ Conectando a {MOODLE_URL}...")
    try:
        token = get_token(MOODLE_URL, config["usuario"], config["contrasena"])
    except Exception as e:
        print(f"✗ Login fallido: {e}")
        sys.exit(1)

    client = MoodleClient(MOODLE_URL, token)
    print("✓ Login exitoso")

    print("→ Obteniendo cursos...")
    try:
        course_ids, userid = get_courses(client)
    except Exception as e:
        print(f"✗ Error: {e}")
        sys.exit(1)

    found   = list(course_ids.keys())
    missing = [k for k in CURSOS if k not in course_ids]
    print(f"✓ Encontrados: {', '.join(found) or 'ninguno'}")
    if missing:
        print(f"  No encontrados: {', '.join(missing)}")

    all_notifs = []

    print("\n→ Revisando foros...")
    all_notifs += check_foros(client, course_ids)

    print("→ Revisando tareas...")
    all_notifs += check_tareas(client, course_ids, userid)

    print("→ Revisando materiales nuevos...")
    all_notifs += check_materiales(client, course_ids)

    print("→ Buscando secciones de examen...")
    all_notifs += check_parciales(client, course_ids)

    print("→ Revisando calificaciones...")
    all_notifs += check_calificaciones(client, course_ids, userid)

    # Resumen
    danger  = sum(1 for n in all_notifs if n["tipo"] == "danger")
    warning = sum(1 for n in all_notifs if n["tipo"] == "warning")
    info    = sum(1 for n in all_notifs if n["tipo"] == "info")
    success = sum(1 for n in all_notifs if n["tipo"] == "success")
    print(f"\n{'─'*40}")
    if danger:      print(f"  🔴 {danger} urgente{'s' if danger > 1 else ''}")
    if warning:     print(f"  🟡 {warning} próximo{'s' if warning > 1 else ''}")
    if info:        print(f"  🔵 {info} informativo{'s' if info > 1 else ''}")
    if success:     print(f"  🟢 {success} completado{'s' if success > 1 else ''}")
    if not all_notifs: print("  ✓ Todo al día")

    write_notifications(all_notifs)
    print("→ Publicando en la app...")
    git_push()
    print("\n✓ Listo")


if __name__ == "__main__":
    main()

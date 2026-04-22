// ============================================================
// app.js — Utilidades compartidas de EstudioFING
// ============================================================

// ── Auth ──────────────────────────────────────────────────────
// SHA-256 de la contraseña. Para cambiarla:
//   1. Abrí la consola del navegador y ejecutá:
//      crypto.subtle.digest('SHA-256', new TextEncoder().encode('TU_NUEVA_CONTRASEÑA'))
//        .then(b => console.log(Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')))
//   2. Reemplazá el valor de PASS_HASH con el resultado
const PASS_HASH = '38f3fda64404128c691805edc536d99f1a1721acb30cfa44d2172598d1280836';

function checkAuth() {
  if (sessionStorage.getItem('estudio_auth') !== PASS_HASH) {
    window.location.replace('login.html');
  }
}

async function hashStr(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function doLogin(password) {
  const hash = await hashStr(password);
  if (hash === PASS_HASH) {
    sessionStorage.setItem('estudio_auth', hash);
    window.location.replace('index.html');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('estudio_auth');
  window.location.replace('login.html');
}

// ── Sidebar ──────────────────────────────────────────────────
function renderSidebar(activePage) {
  const pages = [
    { id: 'dashboard',   href: 'index.html',       icon: '⊞', label: 'Dashboard' },
    { id: 'resumenes',   href: 'resumenes.html',    icon: '✉', label: 'Resúmenes' },
    { id: 'cuaderno',    href: 'cuaderno.html',     icon: '📓', label: 'Cuaderno' },
    { id: 'bibliografia',href: 'bibliografia.html', icon: '📚', label: 'Bibliografía' },
    { id: 'estudio',     href: 'estudio.html',      icon: '🧠', label: 'Estudio' },
  ];

  const navHTML = pages.map(p => `
    <li>
      <a href="${p.href}" class="nav-link ${activePage === p.id ? 'active' : ''}">
        <span class="nav-icon">${p.icon}</span>
        ${p.label}
      </a>
    </li>
  `).join('');

  const today = new Date().toLocaleDateString('es-UY', { weekday:'long', day:'numeric', month:'long' });
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

  const el = document.getElementById('sidebar');
  if (!el) return;

  el.innerHTML = `
    <div class="sidebar-brand">
      <div class="brand-icon">F</div>
      <div>
        <div class="brand-text">EstudioFING</div>
        <div class="brand-sub">FING · UdelaR</div>
      </div>
    </div>
    <div class="nav-section">Navegación</div>
    <ul class="nav-links">${navHTML}</ul>
    <div class="sidebar-footer">
      <div style="margin-bottom:8px">${cap(today)}</div>
      <button onclick="logout()" style="
        width:100%;padding:7px;border-radius:6px;border:1px solid #334155;
        background:transparent;color:#94a3b8;font-size:12px;font-weight:600;
        cursor:pointer;transition:all .15s;
      " onmouseover="this.style.background='#1e293b';this.style.color='#f1f5f9'"
         onmouseout="this.style.background='transparent';this.style.color='#94a3b8'">
        Cerrar sesión
      </button>
    </div>
  `;
}

// ── LocalStorage — Estado de resúmenes ───────────────────────
function getResumenState() {
  try { return JSON.parse(localStorage.getItem('resumenes_state') || '{}'); }
  catch { return {}; }
}

function setResumenState(id, campo, valor) {
  const state = getResumenState();
  if (!state[id]) state[id] = {};
  state[id][campo] = valor;
  localStorage.setItem('resumenes_state', JSON.stringify(state));
}

// ── LocalStorage — Estado de flashcards ──────────────────────
function getFlashcardState() {
  try { return JSON.parse(localStorage.getItem('flashcards_state') || '{}'); }
  catch { return {}; }
}

function setFlashcardState(key, valor) {
  const state = getFlashcardState();
  state[key] = valor;
  localStorage.setItem('flashcards_state', JSON.stringify(state));
}

// ── LocalStorage — Puntajes de quiz ──────────────────────────
function getQuizScores() {
  try { return JSON.parse(localStorage.getItem('quiz_scores') || '{}'); }
  catch { return {}; }
}

function setQuizScore(key, score, total) {
  const scores = getQuizScores();
  scores[key] = { score, total, fecha: new Date().toISOString().slice(0,10) };
  localStorage.setItem('quiz_scores', JSON.stringify(scores));
}

// ── Helpers ───────────────────────────────────────────────────
function formatFecha(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-UY', { day:'2-digit', month:'short', year:'numeric' });
}

function getResumenesAll() {
  const all = [];
  DATA.materias.forEach(m => {
    (m.resumenes || []).forEach(r => {
      all.push(Object.assign({}, r, { materiaId: m.id, materiaNombre: m.abrev, materiaColor: m.color }));
    });
  });
  all.sort((a,b) => b.fecha.localeCompare(a.fecha));
  return all;
}

function getBibliografiaAll() {
  const all = [];
  DATA.materias.forEach(m => {
    (m.bibliografia || []).forEach(b => {
      all.push(Object.assign({}, b, { materiaId: m.id, materiaNombre: m.abrev, materiaColor: m.color }));
    });
  });
  return all;
}

function getTextosTotales() {
  return DATA.materias.reduce((sum, m) => sum + (m.textos || []).length, 0);
}

function getResumidosTotales() {
  return DATA.materias.reduce((sum, m) => sum + (m.textos || []).filter(t => t.resumido).length, 0);
}

function getResumenesTotales() {
  return DATA.materias.reduce((sum, m) => sum + (m.resumenes || []).length, 0);
}

// Nivel badge
function nivelBadge(nivel) {
  const map = { basico: '#dcfce7|#166534', medio: '#fef9c3|#854d0e', avanzado: '#fee2e2|#991b1b' };
  const [bg, color] = (map[nivel] || '#f1f5f9|#475569').split('|');
  return `<span class="badge" style="background:${bg};color:${color}">${nivel || ''}</span>`;
}

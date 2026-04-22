// ============================================================
// app.js — Utilidades compartidas de EstudioFING
// ============================================================

// ── Sidebar ──────────────────────────────────────────────────
function renderSidebar(activePage) {
  const pages = [
    { id: 'dashboard',   href: 'index.html',       icon: '⊞', label: 'Dashboard' },
    { id: 'resumenes',   href: 'resumenes.html',    icon: '✉', label: 'Resúmenes' },
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
    <div class="sidebar-footer">${cap(today)}</div>
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

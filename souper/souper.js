// ─────────────────────────────────────────────────────────
//  Souper — logique principale
//  Dépend de : ../config.js + CDN supabase-js
// ─────────────────────────────────────────────────────────

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── État ──────────────────────────────────────────────────

let allReservations = [];
let allCartes       = [];
let selectedId      = null;   // UUID de la réservation sélectionnée
let standaloneMode  = false;  // panneau "carte indépendante"
let searchQuery     = '';
let filterMode      = 'all';  // 'all' | 'paid' | 'unpaid'

// ── Helpers ───────────────────────────────────────────────

function fmt(amount) {
  return parseFloat(amount || 0).toFixed(2).replace('.', ',') + ' €';
}

function fmtGuests(r) {
  const parts = [];
  if (r.adultes > 0) parts.push(r.adultes + ' Ad.');
  if (r.alcool  > 0) parts.push(r.alcool  + ' Alc.');
  if (r.vg      > 0) parts.push(r.vg      + ' VG');
  if (r.enfants > 0) parts.push(r.enfants + ' Enf.');
  return parts.join(' · ') || '—';
}

function cartesFor(reservationId) {
  return allCartes.filter(c => c.reservation_id === reservationId);
}

function standaloneCartes() {
  return allCartes.filter(c => c.reservation_id === null);
}

function computeCA() {
  const fromRes    = allReservations
    .filter(r => r.paye)
    .reduce((s, r) => s + parseFloat(r.prix), 0);
  const fromCartes = allCartes
    .reduce((s, c) => s + parseFloat(c.montant), 0);
  return Math.round((fromRes + fromCartes) * 100) / 100;
}

function getFiltered() {
  return allReservations.filter(r => {
    const name        = `${r.nom} ${r.prenom}`.toLowerCase();
    const matchSearch = name.includes(searchQuery.toLowerCase());
    const matchFilter = filterMode === 'all'    ? true
                      : filterMode === 'paid'   ? r.paye
                      : /* unpaid */              !r.paye;
    return matchSearch && matchFilter;
  });
}

// ── Données ───────────────────────────────────────────────

async function loadAll() {
  const [resResult, cartesResult] = await Promise.all([
    db.from('reservations').select('*').order('nom'),
    db.from('souper_cartes').select('*').order('created_at')
  ]);
  if (resResult.error)    throw resResult.error;
  if (cartesResult.error) throw cartesResult.error;
  allReservations = resResult.data    || [];
  allCartes       = cartesResult.data || [];
}

// ── Actions ───────────────────────────────────────────────

async function togglePaid(id) {
  const r = allReservations.find(x => x.id === id);
  if (!r) return;
  const { error } = await db.from('reservations')
    .update({ paye: !r.paye })
    .eq('id', id);
  if (error) throw error;
  await loadAll();
  renderAll();
}

async function addCarte(reservationId, montant) {
  const { error } = await db.from('souper_cartes').insert({
    reservation_id: reservationId || null,
    montant
  });
  if (error) throw error;
  await loadAll();
  renderAll();
}

async function deleteCarte(carteId) {
  const { error } = await db.from('souper_cartes')
    .delete()
    .eq('id', carteId);
  if (error) throw error;
  await loadAll();
  renderAll();
}

// ── Rendu — barre de stats ────────────────────────────────

function renderStatsBar() {
  const ca       = computeCA();
  const paid     = allReservations.filter(r =>  r.paye).length;
  const unpaid   = allReservations.filter(r => !r.paye).length;
  const carteTot = allCartes.reduce((s, c) => s + parseFloat(c.montant), 0);

  document.getElementById('ca-total').textContent     = fmt(ca);
  document.getElementById('nb-paid').textContent      = paid;
  document.getElementById('nb-unpaid').textContent    = unpaid;
  document.getElementById('cartes-total').textContent = fmt(carteTot);
}

// ── Rendu — liste des réservations ───────────────────────

function renderList() {
  const list     = document.getElementById('res-list');
  const filtered = getFiltered();

  if (filtered.length === 0) {
    list.innerHTML = '<p class="list-empty">Aucune réservation trouvée</p>';
    return;
  }

  list.innerHTML = filtered.map(r => {
    const resCartes = cartesFor(r.id);
    const carteTot  = resCartes.reduce((s, c) => s + parseFloat(c.montant), 0);
    const isSelected = r.id === selectedId;

    const cartesHint = resCartes.length > 0
      ? `<div class="res-cartes-hint">${resCartes.length} carte${resCartes.length > 1 ? 's' : ''} · +${fmt(carteTot)}</div>`
      : '';

    return `
      <div class="res-item ${r.paye ? 'is-paid' : ''} ${isSelected ? 'is-selected' : ''}" data-id="${r.id}">
        <div class="res-row-main">
          <div class="res-info">
            <span class="res-name">${r.nom} ${r.prenom}</span>
            <span class="res-guests">${fmtGuests(r)}${r.dessert ? ' · Dessert' : ''}</span>
          </div>
          <div class="res-right">
            <span class="res-price">${fmt(r.prix)}</span>
            <span class="res-badge ${r.paye ? 'badge-paid' : 'badge-unpaid'}">${r.paye ? 'Payé' : 'Impayé'}</span>
          </div>
        </div>
        ${cartesHint}
      </div>
    `;
  }).join('');

  list.querySelectorAll('.res-item').forEach(el => {
    el.addEventListener('click', () => {
      selectedId     = el.dataset.id;
      standaloneMode = false;
      renderAll();
    });
  });
}

// ── Rendu — panneau de détail ─────────────────────────────

function renderPanel() {
  const panel = document.getElementById('detail-panel');

  // ── Panneau "carte indépendante" ──────────────────────
  if (standaloneMode || selectedId === null) {
    const standCartes = standaloneCartes();
    const standTotal  = standCartes.reduce((s, c) => s + parseFloat(c.montant), 0);

    panel.innerHTML = `
      <div class="panel-header">
        <div>
          <div class="panel-title">Carte indépendante</div>
          <div class="panel-subtitle">Non liée à une réservation</div>
        </div>
      </div>

      <div class="panel-section">
        <div class="section-label">Ajouter</div>
        <div class="carte-btns">
          <button class="btn-carte" data-montant="5">+ 5 €</button>
          <button class="btn-carte" data-montant="10">+ 10 €</button>
          <button class="btn-carte" data-montant="20">+ 20 €</button>
        </div>
      </div>

      ${standCartes.length > 0 ? `
        <div class="panel-section">
          <div class="section-label">Cartes vendues (${standCartes.length})</div>
          <div class="cartes-list">
            ${standCartes.map(c => `
              <div class="carte-item">
                <span class="carte-amount">${fmt(c.montant)}</span>
                <button class="btn-del-carte" data-id="${c.id}" title="Supprimer">×</button>
              </div>
            `).join('')}
          </div>
          <div class="cartes-subtotal">Sous-total : ${fmt(standTotal)}</div>
        </div>
      ` : `<p class="panel-empty">Aucune carte indépendante</p>`}
    `;

    attachCarteEvents(panel, null);
    return;
  }

  // ── Panneau réservation ───────────────────────────────
  const r = allReservations.find(x => x.id === selectedId);
  if (!r) { selectedId = null; renderPanel(); return; }

  const resCartes  = cartesFor(r.id);
  const carteTot   = resCartes.reduce((s, c) => s + parseFloat(c.montant), 0);
  const totalEnc   = parseFloat(r.prix) + carteTot;

  panel.innerHTML = `
    <div class="panel-header">
      <div>
        <div class="panel-title">${r.nom} ${r.prenom}</div>
        ${r.telephone ? `<div class="panel-phone">${r.telephone}</div>` : ''}
      </div>
      <button class="btn-close" id="btn-close-panel">×</button>
    </div>

    <div class="panel-section">
      <div class="guests-grid">
        ${r.adultes > 0 ? `<div class="guest-row"><span>Adultes</span><span>${r.adultes}</span></div>` : ''}
        ${r.alcool  > 0 ? `<div class="guest-row"><span>Avec alcool</span><span>${r.alcool}</span></div>` : ''}
        ${r.vg      > 0 ? `<div class="guest-row"><span>Végétarien</span><span>${r.vg}</span></div>` : ''}
        ${r.enfants > 0 ? `<div class="guest-row"><span>Enfants</span><span>${r.enfants}</span></div>` : ''}
      </div>
      <div class="prix-row">
        <span>Prix réservation</span>
        <span class="prix-val">${fmt(r.prix)}</span>
      </div>
    </div>

    ${r.dessert ? `
      <div class="panel-section panel-dessert">
        <div class="dessert-cp">${r.cp}</div>
        <div class="dessert-nom">${r.dessert_nom}</div>
      </div>
    ` : ''}

    <div class="panel-section">
      <button class="btn-toggle-paid ${r.paye ? 'btn-annuler-paiement' : 'btn-payer'}" id="btn-toggle-paid">
        ${r.paye ? 'Annuler le paiement' : 'Marquer comme payé'}
      </button>
    </div>

    <div class="panel-section">
      <div class="section-label">Ajouter une carte</div>
      <div class="carte-btns">
        <button class="btn-carte" data-montant="5">+ 5 €</button>
        <button class="btn-carte" data-montant="10">+ 10 €</button>
        <button class="btn-carte" data-montant="20">+ 20 €</button>
      </div>
    </div>

    ${resCartes.length > 0 ? `
      <div class="panel-section">
        <div class="section-label">Cartes liées (${resCartes.length})</div>
        <div class="cartes-list">
          ${resCartes.map(c => `
            <div class="carte-item">
              <span class="carte-amount">${fmt(c.montant)}</span>
              <button class="btn-del-carte" data-id="${c.id}" title="Supprimer">×</button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <div class="panel-footer">
      <div class="total-label">Total encaissé</div>
      <div class="total-val">${fmt(totalEnc)}</div>
    </div>
  `;

  // Fermer le panneau
  document.getElementById('btn-close-panel').addEventListener('click', () => {
    selectedId = null; standaloneMode = false; renderAll();
  });

  // Basculer payé
  document.getElementById('btn-toggle-paid').addEventListener('click', async (e) => {
    e.currentTarget.disabled = true;
    try { await togglePaid(r.id); }
    catch (err) { alert('Erreur : ' + err.message); e.currentTarget.disabled = false; }
  });

  attachCarteEvents(panel, r.id);
}

// Attache les boutons +carte et supprimer carte
function attachCarteEvents(panel, reservationId) {
  panel.querySelectorAll('.btn-carte').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      try { await addCarte(reservationId, parseFloat(btn.dataset.montant)); }
      catch (err) { alert('Erreur : ' + err.message); btn.disabled = false; }
    });
  });

  panel.querySelectorAll('.btn-del-carte').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Supprimer cette carte ?')) return;
      btn.disabled = true;
      try { await deleteCarte(btn.dataset.id); }
      catch (err) { alert('Erreur : ' + err.message); btn.disabled = false; }
    });
  });
}

// ── Rendu global ──────────────────────────────────────────

function renderAll() {
  renderStatsBar();
  renderList();
  renderPanel();
}

// ── Initialisation ────────────────────────────────────────

async function init() {
  // Recherche
  document.getElementById('search-input').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    renderList();
  });

  // Onglets filtre
  const activeClass = { all: 'active', paid: 'active-paid', unpaid: 'active-unpaid' };
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      filterMode = btn.dataset.filter;
      document.querySelectorAll('.filter-tab')
        .forEach(b => b.classList.remove('active', 'active-paid', 'active-unpaid'));
      btn.classList.add(activeClass[filterMode] || 'active');
      renderList();
    });
  });

  // Bouton carte indépendante
  document.getElementById('btn-standalone').addEventListener('click', () => {
    selectedId     = null;
    standaloneMode = true;
    renderAll();
  });

  try {
    await loadAll();
    renderAll();
  } catch (err) {
    console.error('Init error:', err);
    document.getElementById('res-list').innerHTML =
      '<p class="list-empty" style="color:#e53e3e">Erreur de connexion à la base de données.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);

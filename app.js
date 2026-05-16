const MENU = [
  {
    category: 'Softs',
    items: [
      { id: 'coca',  name: 'Coca',       price: 2.00 },
      { id: 'fanta', name: 'Fanta',      price: 2.00 },
      { id: 'eau',   name: 'Eau plate',  price: 0.00 },
      { id: 'gren',  name: 'Grenadine',  price: 0.50 }
    ]
  },
  {
    category: 'Bières',
    items: [
      { id: 'jup',  name: 'Jupiler',       price: 2.50 },
      { id: 'blan', name: 'Blanche Rosée', price: 3.50 },
      { id: 'stf',  name: 'St-Feuillen',   price: 4.00 }
    ]
  },
  {
    category: 'Vins',
    items: [
      { id: 'roseV', name: 'Rosé (verre)',     price: 2.50 },
      { id: 'roseB', name: 'Rosé (bouteille)', price: 15.00 }
    ]
  }
];

const ICONS = {
  coca: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="14" rx="13" ry="4" fill="#991B1B"/>
    <rect x="13" y="14" width="26" height="27" rx="3" fill="#DC2626"/>
    <ellipse cx="26" cy="41" rx="13" ry="4" fill="#991B1B"/>
    <rect x="15" y="17" width="5" height="21" rx="2.5" fill="rgba(255,255,255,0.22)"/>
    <rect x="20" y="9" width="12" height="6" rx="3" fill="#9CA3AF"/>
    <ellipse cx="26" cy="9" rx="4" ry="1.8" fill="#6B7280"/>
  </svg>`,

  fanta: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="14" rx="13" ry="4" fill="#C2410C"/>
    <rect x="13" y="14" width="26" height="27" rx="3" fill="#F97316"/>
    <ellipse cx="26" cy="41" rx="13" ry="4" fill="#C2410C"/>
    <rect x="15" y="17" width="5" height="21" rx="2.5" fill="rgba(255,255,255,0.22)"/>
    <rect x="20" y="9" width="12" height="6" rx="3" fill="#9CA3AF"/>
    <ellipse cx="26" cy="9" rx="4" ry="1.8" fill="#6B7280"/>
  </svg>`,

  eau: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="21" y="5" width="10" height="7" rx="2" fill="#60A5FA"/>
    <rect x="20" y="11" width="12" height="9" rx="2" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.2"/>
    <rect x="14" y="19" width="24" height="27" rx="5" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.2"/>
    <rect x="15.5" y="30" width="21" height="15" rx="3.5" fill="#BFDBFE"/>
    <rect x="17" y="21" width="4" height="20" rx="2" fill="rgba(255,255,255,0.7)"/>
  </svg>`,

  gren: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="21" y="5" width="10" height="7" rx="2" fill="#BE185D"/>
    <rect x="20" y="11" width="12" height="9" rx="2" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="1.2"/>
    <rect x="14" y="19" width="24" height="27" rx="5" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="1.2"/>
    <rect x="16" y="23" width="20" height="11" rx="2.5" fill="rgba(255,255,255,0.8)"/>
    <rect x="15.5" y="31" width="21" height="14" rx="3.5" fill="#FB7185" opacity="0.72"/>
    <rect x="17" y="21" width="4" height="20" rx="2" fill="rgba(255,255,255,0.4)"/>
  </svg>`,

  jup: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="21" y="5" width="10" height="6" rx="1.5" fill="#EAB308"/>
    <rect x="21" y="10" width="10" height="10" rx="2" fill="#92400E" stroke="#78350F" stroke-width="1"/>
    <path d="M21 19 Q14 23 13 29 L39 29 Q38 23 31 19 Z" fill="#92400E"/>
    <rect x="13" y="27" width="26" height="20" rx="4" fill="#92400E" stroke="#78350F" stroke-width="1"/>
    <rect x="15" y="29" width="22" height="11" rx="2.5" fill="#FEF3C7"/>
    <rect x="16" y="30" width="20" height="4" rx="1.5" fill="#EAB308"/>
    <rect x="14.5" y="37" width="23" height="9" rx="3" fill="#FBBF24" opacity="0.3"/>
    <rect x="14.5" y="28" width="3.5" height="18" rx="1.75" fill="rgba(255,255,255,0.28)"/>
  </svg>`,

  blan: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="21" y="5" width="10" height="6" rx="1.5" fill="#FCA5A5"/>
    <rect x="21" y="10" width="10" height="10" rx="2" fill="#FEE2E2" stroke="#FECACA" stroke-width="1"/>
    <path d="M21 19 Q14 23 13 29 L39 29 Q38 23 31 19 Z" fill="#FEE2E2"/>
    <rect x="13" y="27" width="26" height="20" rx="4" fill="#FFF1F2" stroke="#FECACA" stroke-width="1"/>
    <rect x="15" y="29" width="22" height="11" rx="2.5" fill="white"/>
    <rect x="16" y="30" width="20" height="4" rx="1.5" fill="#FCA5A5"/>
    <rect x="14.5" y="37" width="23" height="9" rx="3" fill="#FCA5A5" opacity="0.35"/>
    <rect x="14.5" y="28" width="3.5" height="18" rx="1.75" fill="rgba(255,255,255,0.5)"/>
  </svg>`,

  stf: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="21" y="5" width="10" height="6" rx="1.5" fill="#166534"/>
    <rect x="21" y="10" width="10" height="10" rx="2" fill="#14532D" stroke="#052E16" stroke-width="1"/>
    <path d="M21 19 Q14 23 13 29 L39 29 Q38 23 31 19 Z" fill="#14532D"/>
    <rect x="13" y="27" width="26" height="20" rx="4" fill="#166534" stroke="#052E16" stroke-width="1"/>
    <rect x="15" y="29" width="22" height="11" rx="2.5" fill="#DCFCE7" opacity="0.85"/>
    <rect x="16" y="30" width="20" height="4" rx="1.5" fill="#166534"/>
    <rect x="14.5" y="37" width="23" height="9" rx="3" fill="#D97706" opacity="0.28"/>
    <rect x="14.5" y="28" width="3.5" height="18" rx="1.75" fill="rgba(255,255,255,0.18)"/>
  </svg>`,

  roseV: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 7 Q14 32 26 34 Q38 32 38 7 Z" fill="#FECDD3" stroke="#FDA4AF" stroke-width="1.2"/>
    <path d="M16.5 18 Q17 32 26 33.5 Q35 32 35.5 18 Z" fill="#FB7185" opacity="0.62"/>
    <rect x="24.5" y="33" width="3" height="11" rx="1" fill="#D1D5DB"/>
    <rect x="17" y="43" width="18" height="3.5" rx="1.75" fill="#D1D5DB"/>
    <path d="M17 8.5 L20.5 8.5 L20 28 L16.5 26 Z" fill="rgba(255,255,255,0.38)"/>
  </svg>`,

  roseB: `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="4" width="8" height="8" rx="2" fill="#FB7185"/>
    <rect x="22" y="11" width="8" height="10" rx="1.5" fill="#FECDD3" stroke="#FDA4AF" stroke-width="1"/>
    <path d="M22 20 Q17 24 16 27 L36 27 Q35 24 30 20 Z" fill="#FECDD3"/>
    <rect x="16" y="25" width="20" height="23" rx="4" fill="#FECDD3" stroke="#FDA4AF" stroke-width="1"/>
    <rect x="18" y="27" width="16" height="10" rx="2" fill="rgba(255,255,255,0.8)"/>
    <rect x="19" y="28" width="14" height="3" rx="1" fill="#FB7185" opacity="0.75"/>
    <rect x="17.5" y="34" width="17" height="13" rx="3" fill="#FB7185" opacity="0.48"/>
    <rect x="17.5" y="26" width="3.5" height="20" rx="1.75" fill="rgba(255,255,255,0.35)"/>
  </svg>`
};

// ── État du panier ────────────────────────────────────────

let cart = {};

function allItems() {
  return MENU.flatMap(c => c.items);
}

function formatPrice(amount) {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

function getCases(amount) {
  return Math.round(amount / 0.50);
}

function getCartTotal() {
  return allItems().reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0);
}

function getTotalDrinks() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function isCartEmpty() {
  return getTotalDrinks() === 0;
}

// ── Rendu ─────────────────────────────────────────────────

function renderMenu() {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';

  MENU.forEach(category => {
    const catEl = document.createElement('div');
    catEl.className = 'category-header';
    catEl.textContent = category.category;
    grid.appendChild(catEl);

    const row = document.createElement('div');
    row.className = 'items-row';

    category.items.forEach(item => {
      const qty = cart[item.id] || 0;
      const btn = document.createElement('button');
      btn.className = 'item-btn' + (qty > 0 ? ' in-cart' : '');
      btn.dataset.id = item.id;

      const priceHtml = item.price === 0
        ? '<span class="price-free">Gratuit</span>'
        : formatPrice(item.price);

      const badgeHtml = qty > 0
        ? `<span class="item-badge">${qty}</span>`
        : '';

      btn.innerHTML = `
        ${badgeHtml}
        <div class="item-icon">${ICONS[item.id]}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">${priceHtml}</div>
      `;

      btn.addEventListener('click', () => addToCart(item.id));
      row.appendChild(btn);
    });

    grid.appendChild(row);
  });
}

function renderOrder() {
  const orderItems   = document.getElementById('order-items');
  const orderTotal   = document.getElementById('order-total');
  const orderCasesEl = document.getElementById('order-cases');
  const btnEncaisser = document.getElementById('btn-encaisser');

  const cartItems = allItems().filter(item => (cart[item.id] || 0) > 0);

  if (cartItems.length === 0) {
    orderItems.innerHTML = '<p class="order-empty">Aucun article sélectionné</p>';
  } else {
    orderItems.innerHTML = cartItems.map(item => {
      const qty        = cart[item.id];
      const subtotal   = item.price * qty;
      const cases      = getCases(subtotal);
      const subtotalHtml = item.price === 0
        ? '<span class="price-free">Gratuit</span>'
        : formatPrice(subtotal);
      const casesHtml  = cases > 0
        ? `<span class="item-cases">${cases} case${cases > 1 ? 's' : ''}</span>`
        : '';

      return `
        <div class="order-item">
          <div class="order-item-controls">
            <button class="btn-qty btn-minus" data-id="${item.id}">&#8722;</button>
            <span class="order-item-qty">${qty}</span>
            <button class="btn-qty btn-plus"  data-id="${item.id}">+</button>
          </div>
          <div class="order-item-info">
            <span class="order-item-name">${item.name}</span>
            ${casesHtml}
          </div>
          <span class="order-item-subtotal">${subtotalHtml}</span>
        </div>
      `;
    }).join('');

    orderItems.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
    orderItems.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => addToCart(btn.dataset.id));
    });
  }

  const total      = getCartTotal();
  const totalCases = getCases(total);
  orderTotal.textContent   = formatPrice(total);
  orderCasesEl.textContent = `${totalCases} case${totalCases !== 1 ? 's' : ''} × 0,50 €`;
  btnEncaisser.disabled    = isCartEmpty();
}

async function renderStats() {
  const elDrinks  = document.getElementById('total-drinks');
  const elRevenue = document.getElementById('total-revenue');
  try {
    const stats = await Storage.export();
    elDrinks.textContent  = stats.totalDrinks;
    elRevenue.textContent = formatPrice(stats.totalRevenue);
  } catch (e) {
    elDrinks.textContent  = '—';
    elRevenue.textContent = 'Erreur BDD';
    console.error('renderStats :', e);
  }
}

// ── Actions panier ────────────────────────────────────────

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderMenu();
  renderOrder();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id] > 1 ? cart[id]-- : delete cart[id];
  renderMenu();
  renderOrder();
}

function clearCart() {
  cart = {};
  renderMenu();
  renderOrder();
}

// ── Encaissement ──────────────────────────────────────────

async function encaisser() {
  if (isCartEmpty()) return;

  const btn = document.getElementById('btn-encaisser');
  btn.disabled    = true;
  btn.textContent = 'Enregistrement…';

  try {
    await Storage.addOrder(cart);

    // Flash de confirmation
    const overlay = document.getElementById('flash-overlay');
    overlay.classList.add('visible');
    setTimeout(() => overlay.classList.remove('visible'), 1300);

    clearCart();
    await renderStats();
  } catch (e) {
    console.error('encaisser :', e);
    alert('Erreur lors de l\'enregistrement.\nVérifie la connexion internet.');
    btn.disabled    = false;
    btn.textContent = 'Encaisser';
  }
}

// ── Initialisation ────────────────────────────────────────

async function init() {
  renderMenu();
  renderOrder();
  await renderStats();

  document.getElementById('btn-encaisser').addEventListener('click', encaisser);
  document.getElementById('btn-annuler').addEventListener('click', clearCart);
}

document.addEventListener('DOMContentLoaded', init);

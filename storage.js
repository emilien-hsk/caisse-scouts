// ─────────────────────────────────────────────────────────
//  Storage — couche Supabase
//  Dépend de : config.js (SUPABASE_URL, SUPABASE_ANON_KEY)
//              CDN supabase-js (window.supabase)
// ─────────────────────────────────────────────────────────

const MENU_PRICES = {
  coca:  2.00,
  fanta: 2.00,
  eau:   0.00,
  gren:  0.50,
  jup:   2.50,
  blan:  3.50,
  stf:   4.00,
  roseV: 2.50,
  roseB: 15.00
};

const MENU_NAMES = {
  coca:  'Coca',
  fanta: 'Fanta',
  eau:   'Eau plate',
  gren:  'Grenadine',
  jup:   'Jupiler',
  blan:  'Blanche Rosée',
  stf:   'St-Feuillen',
  roseV: 'Rosé (verre)',
  roseB: 'Rosé (bouteille)'
};

// Initialisation du client Supabase (window.supabase exposé par le CDN)
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Storage = {

  /**
   * Insère une commande dans la table `orders`.
   * @param {Object} order  – { id: quantité, ... }
   */
  async addOrder(order) {
    let total = 0;
    for (const [id, qty] of Object.entries(order)) {
      total += (MENU_PRICES[id] || 0) * qty;
    }

    const { error } = await db.from('orders').insert({
      items: order,
      total: Math.round(total * 100) / 100
    });

    if (error) throw new Error('addOrder : ' + error.message);
  },

  /**
   * Efface toutes les commandes après confirmation.
   * @returns {boolean} true si la réinitialisation a eu lieu
   */
  async reset() {
    if (!window.confirm('Remettre toutes les statistiques à zéro ?')) return false;

    const { error } = await db.from('orders').delete().not('id', 'is', null);
    if (error) throw new Error('reset : ' + error.message);
    return true;
  },

  /**
   * Calcule les statistiques agrégées depuis Supabase.
   * @returns {{ totalRevenue, totalDrinks, totalOrders, byItem[] }}
   */
  async export() {
    const { data: orders, error } = await db
      .from('orders')
      .select('items, total');

    if (error) throw new Error('export : ' + error.message);

    const rows = orders || [];
    const sales = {};
    let totalRevenue = 0;
    let totalDrinks  = 0;

    for (const row of rows) {
      totalRevenue += parseFloat(row.total) || 0;
      for (const [id, qty] of Object.entries(row.items || {})) {
        sales[id]  = (sales[id] || 0) + qty;
        totalDrinks += qty;
      }
    }

    const byItem = Object.entries(MENU_NAMES)
      .map(([id, name]) => {
        const qty     = sales[id] || 0;
        const price   = MENU_PRICES[id];
        const revenue = Math.round(price * qty * 100) / 100;
        return { id, name, qty, revenue, price };
      })
      .filter(item => item.qty > 0)
      .sort((a, b) => b.qty - a.qty);

    const maxQty = byItem.length > 0 ? byItem[0].qty : 1;
    byItem.forEach(item => {
      item.pct = Math.round((item.qty / maxQty) * 100);
    });

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalDrinks,
      totalOrders: rows.length,
      byItem
    };
  }
};

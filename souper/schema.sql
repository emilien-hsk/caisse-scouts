-- ─────────────────────────────────────────────────────────
--  SOUPER — Scouts Écaussinnes
--  À exécuter dans Supabase → SQL Editor
-- ─────────────────────────────────────────────────────────

-- 1. Tables
CREATE TABLE IF NOT EXISTS reservations (
  id          UUID           DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         TEXT           NOT NULL,
  prenom      TEXT           NOT NULL,
  telephone   TEXT           DEFAULT '',
  adultes     INTEGER        DEFAULT 0,
  alcool      INTEGER        DEFAULT 0,
  vg          INTEGER        DEFAULT 0,
  enfants     INTEGER        DEFAULT 0,
  dessert     BOOLEAN        DEFAULT false,
  cp          TEXT           DEFAULT '',
  dessert_nom TEXT           DEFAULT '',
  prix        NUMERIC(10,2)  NOT NULL DEFAULT 0,
  paye        BOOLEAN        DEFAULT false
);

CREATE TABLE IF NOT EXISTS souper_cartes (
  id             UUID           DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at     TIMESTAMPTZ    DEFAULT now(),
  reservation_id UUID           REFERENCES reservations(id) ON DELETE SET NULL,
  montant        NUMERIC(10,2)  NOT NULL
);

-- 2. Row Level Security (accès public — outil interne)
ALTER TABLE reservations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE souper_cartes  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès public" ON reservations  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Accès public" ON souper_cartes FOR ALL USING (true) WITH CHECK (true);

-- 3. Import des réservations
INSERT INTO reservations (nom, prenom, telephone, adultes, alcool, vg, enfants, dessert, cp, dessert_nom, prix, paye) VALUES
('Amblar',           'Justin',        '04696969',              1, 0, 0, 0, false, '',           '',                              16.00, false),
('Amblard',          'Louis',         '',                      1, 0, 0, 0, false, '',           '',                              16.00, false),
('Blanchez',         'Jean-Philippe', '0478873236',            2, 0, 0, 1, false, '',           '',                              42.00, true),
('Bulteau Rompat',   'Julie',         '0498595635',            1, 1, 1, 0, false, '',           '',                              44.00, true),
('D hilster',        'Daniel',        '0478641333',            2, 0, 0, 0, false, '',           '',                              32.00, true),
('D hilster',        'Nicolas',       '0483460454',            3, 1, 0, 1, true,  'Tamarin',    'Crumble',                       72.00, true),
('Daubie',           'Aline',         '495798614',             5, 0, 0, 1, true,  'Tamarin',    'Tiramisu fraises',              90.00, true),
('Degesves',         'Francois',      '0477396503',            1, 1, 1, 1, true,  'Aonyx',      'Brownie chocolat',              54.00, true),
('Delcourt',         'Michel',        '000000001',             2, 0, 0, 0, false, '',           '',                              30.00, true),
('Derumier',         'Rosalie',       '0470666619',            0, 1, 0, 0, false, '',           '',                              14.00, false),
('Dutrieux',         'Nicolas',       '495508841',             1, 0, 0, 0, false, '',           '',                              16.00, true),
('Henskens',         'Emilien',       '6969',                  7, 0, 0, 0, false, '',           '',                             112.00, true),
('Kiang',            'Kiang',         '0472185935',            0, 0, 1, 0, false, '',           '',                              14.00, false),
('La daronne a sn',  'Jag la pute',   'Sososoledie sonsonsonpe', 2, 0, 0, 0, false, '',        '',                              32.00, false),
('Leloup',           'Astrid',        'six ssseven',           0, 1, 0, 0, false, '',           '',                              14.00, false),
('Leroy',            'Juliette',      '0477/290.282',          1, 0, 0, 0, false, '',           '',                              16.00, true),
('Limbourg',         'Mélanie',       '0495857194',            1, 1, 0, 1, false, '',           '',                              40.00, false),
('Moulin',           'Nathan',        '0470534500',            1, 0, 0, 0, false, '',           '',                              16.00, false),
('Moulin',           'Stéphan',       '0475272175',            0, 1, 0, 0, false, '',           '',                              14.00, true),
('Nicolas',          'Marvin',        '0495565687',            0, 1, 0, 0, true,  'THE STAFF',  'Jsp encore mais un truc st',    14.00, true),
('PIRET',            'Jean-François', '0474575612',            1, 0, 0, 3, true,  'Aonyx',      'Encore à déterminer...',        60.00, false),
('Pondengo',         'Maman',         '04000000',              2, 3, 0, 1, false, '',           '',                              84.00, true),
('Ramlot',           'Amaury',        '0492 32 45 11',         1, 0, 0, 0, false, '',           '',                              16.00, false),
('Remy Spiltoir',    'Julie',         '0478454147',            2, 2, 0, 1, true,  'Tamarin',    'Fondant au chocolat',           70.00, true),
('Rouki',            'Zouki',         '0000000002',            2, 0, 0, 0, false, '',           '',                              32.00, false),
('Sebastien',        'Déchamp',       '67686868',              1, 0, 0, 0, false, '',           '',                              16.00, false),
('SIMON',            'Nathalie',      '0486 24 32 06',         1, 2, 0, 0, false, '',           '',                              44.00, false),
('Staf',             'Nell',          '0492/966535',           1, 0, 0, 0, false, '',           '',                              16.00, false),
('Thomas',           'Rudy',          '0496 56 86 07',         7, 0, 0, 1, true,  'Fjord',      'Cake aux pommes',              122.00, true),
('Van Keymeulen',    'Gaspard',       '0479498083',            2, 0, 0, 2, false, '',           '',                              52.00, false),
('Vandenbosch',      'Hugues',        '0494771873',            2, 1, 0, 0, false, '',           '',                              46.00, true),
('Veny',             'Sébastien',     '0492927576',            1, 0, 0, 0, false, '',           '',                              16.00, false),
('Wasmes',           'Andy',          '0471623566',            2, 1, 0, 1, true,  'Bouvreuil',  'Tarte frangipane',              56.00, true);

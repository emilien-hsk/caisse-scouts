# Caisse enregistreuse — Scouts Écaussinnes

Application web de caisse, hébergée sur **Vercel**, base de données **Supabase**.
Accessible depuis n'importe quel appareil avec un navigateur et une connexion internet.

---

## 1. Créer la base de données Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un compte (gratuit).
2. Crée un nouveau projet (choisis une région proche : Europe West).
3. Dans le menu à gauche, ouvre **SQL Editor** et exécute ce script :

```sql
-- Table des commandes
CREATE TABLE orders (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now()             NOT NULL,
  items      JSONB                                 NOT NULL,
  total      NUMERIC(10, 2)                        NOT NULL DEFAULT 0
);

-- Politique d'accès public (outil interne, pas d'authentification)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Accès public"
  ON orders FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Va dans **Settings → API** et note :
   - **Project URL** (ex : `https://abcdefgh.supabase.co`)
   - **anon public** key (longue chaîne JWT)

---

## 2. Configurer le projet

Ouvre le fichier `config.js` et remplace les deux valeurs :

```js
const SUPABASE_URL      = 'https://TON_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'TA_CLE_ANON_PUBLIQUE';
```

> La clé `anon` est publique par conception — Supabase utilise les Row Level
> Security policies pour contrôler les accès, pas le secret de la clé.

---

## 3. Déployer sur Vercel

### Option A — Via GitHub (recommandé)

1. Pousse le dossier `caisse/` sur un dépôt GitHub (public ou privé).
2. Va sur [vercel.com](https://vercel.com), connecte ton compte GitHub.
3. Clique **Add New Project → Import** → sélectionne ton dépôt.
4. Vercel détecte automatiquement un site statique, aucune config de build nécessaire.
5. Clique **Deploy** — l'URL est disponible en quelques secondes.

### Option B — Via la CLI Vercel

```bash
npm i -g vercel
cd caisse/
vercel
```

Suis les instructions, l'URL de production est affichée à la fin.

---

## 4. Utilisation

### Encaisser une commande

1. Appuie sur les boissons pour les ajouter (colonne droite).
2. Ajuste les quantités avec **−** / **+**.
3. Appuie sur le bouton vert **Encaisser** — la commande est enregistrée dans Supabase.

### Consulter les statistiques

Appuie sur **Stats** en haut à droite.
Les données sont rechargées depuis Supabase à chaque ouverture.

### Réinitialiser

Sur la page Stats → bouton **Réinitialiser** → confirmation → toutes les commandes sont supprimées.

---

## 5. Données

Les données sont stockées dans ta base **Supabase** (PostgreSQL hébergé).

- Accessibles depuis **n'importe quel appareil** connecté à internet.
- Persistantes entre les sessions et les rechargements.
- Tu peux consulter les commandes brutes directement dans l'interface Supabase
  (Table Editor → `orders`).

---

## 6. Accès en soirée

Donne simplement l'URL Vercel à tous les bénévoles qui tiennent la caisse.
Plusieurs tablettes peuvent encaisser simultanément — les données se centralisent
dans la même base.

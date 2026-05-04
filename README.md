# Alfamito Holding Manager

Application privée bilingue FR / PT-BR pour gérer le coffre-fort documentaire et le tableau de bord juridique, fiscal, comptable et financier de Alfamito Sàrl.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Données locales dans `data/*.json`
- Documents dans `public/documents`
- Déploiement prévu sur Vercel

## Lancer en local

```bash
npm install
npm run dev
```

Identifiants dans `data/users.json`.

## Ajouter un document

1. Déposer le fichier dans `public/documents/alfamito`.
2. Ajouter une entrée dans `data/documents.json` :

```json
{
  "id": "nouveau-document",
  "title": "Titre du document",
  "category": "legal",
  "date": "2026-05-04",
  "language": "fr",
  "description": "Description courte",
  "path": "/documents/alfamito/nom-du-fichier.pdf"
}
```

Catégories disponibles : `legal`, `tax`, `accounting`, `finance`, `bank`, `realEstate`.

## Ajouter un utilisateur

Ajouter une entrée dans `data/users.json` avec `email`, `name`, `role` et `password`.

Rôles disponibles : `admin`, `manager`, `viewer`.

## Authentification simple

L'application utilise une authentification autonome, sans Supabase, NextAuth, Clerk ni autre SaaS :

- e-mails autorisés dans `data/users.json` ;
- mot de passe local ;
- cookie HTTP-only signé par HMAC ;
- expiration de session après 7 jours ;
- redirection automatique vers la page demandée après connexion.

Pour Vercel, ajouter idéalement une variable d'environnement `ALFAMITO_AUTH_SECRET` longue et privée. Sans cette variable, l'application fonctionne quand même avec une clé de test incluse dans le code, suffisante pour validation mais à remplacer avant usage durable.

## Sécurité documentaire

Les documents sont servis par `/api/document/[id]`, qui vérifie la session, et `proxy.ts` protège les pages privées ainsi que `/api/document/*`. Le dossier `public/documents` reste prévu pour le prototype ; une intégration Dropbox pourra ensuite remplacer `path` par un identifiant distant ou une URL signée.

## Déployer sur Vercel

1. Pousser le repository sur GitHub.
2. Importer le projet dans Vercel.
3. Vérifier la commande de build : `npm run build`.
4. Définir `ALFAMITO_AUTH_SECRET` dans les variables Vercel.

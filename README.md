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

Identifiants de test dans `data/users.json` :

- `admin@alfamito.local` / `ChangeMe2026!`
- `vincent.baron@alfamito.local` / `ChangeMe2026!`

## Ajouter un document

1. Déposer le fichier dans `public/documents`.
2. Ajouter une entrée dans `data/documents.json` :

```json
{
  "id": "nouveau-document",
  "title": "Titre du document",
  "category": "legal",
  "date": "2026-05-04",
  "language": "fr",
  "description": "Description courte",
  "path": "/documents/nom-du-fichier.pdf"
}
```

Catégories disponibles : `legal`, `tax`, `accounting`, `finance`, `bank`, `realEstate`.

## Ajouter un utilisateur

Ajouter une entrée dans `data/users.json` avec `email`, `name`, `role` et `password`.

Rôles disponibles : `admin`, `manager`, `viewer`.

## Sécurité

Ce prototype utilise une session par cookie HTTP-only et une liste locale d'utilisateurs autorisés. Les documents sont servis par `/api/document/[id]`, qui vérifie la session, et `proxy.ts` protège les pages privées ainsi que `/documents/*`.

Pour une mise en production, remplacer les mots de passe en clair par Supabase Auth, NextAuth ou magic link, puis stocker les documents hors `public` ou dans Dropbox/S3 avec URLs signées.

## Déployer sur Vercel

1. Pousser le repository sur GitHub.
2. Importer le projet dans Vercel.
3. Vérifier la commande de build : `npm run build`.
4. Remplacer les identifiants de test avant publication.

## Compatibilité Dropbox future

La structure actuelle garde les chemins de documents dans `data/documents.json`. Une intégration Dropbox pourra remplacer `path` par un identifiant distant ou une URL signée, sans changer les pages principales.

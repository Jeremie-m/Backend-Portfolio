# Portfolio Backend

Ce projet est le backend de mon portfolio personnel, développé avec Next.js et SQLite.

## Technologies Utilisées

- **Backend:** Next.js
- **Base de données:** SQLite
- **Authentification:** JWT (JSON Web Tokens)

## Structure du Projet

Le projet est organisé autour de trois entités principales :
- **Projets:** Gestion des projets du portfolio
- **Blog:** Système de blog avec articles et tags
- **Technologies:** Liste des technologies maîtrisées

## Installation

1. Cloner le projet
```bash
git clone [URL_DU_REPO]
cd Backend-Portfolio
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Modifier les variables dans .env selon vos besoins
```

4. Lancer le serveur de développement
```bash
npm run dev
```

## API Routes

### Projets
- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Crée un nouveau projet
- `PUT /api/projects/:id` - Met à jour un projet
- `DELETE /api/projects/:id` - Supprime un projet

### Blog
- `GET /api/blog` - Liste tous les articles
- `GET /api/blog/:id` - Détails d'un article
- `POST /api/blog` - Crée un nouvel article
- `PUT /api/blog/:id` - Met à jour un article
- `DELETE /api/blog/:id` - Supprime un article

### Technologies
- `GET /api/technologies` - Liste toutes les technologies
- `GET /api/technologies/:id` - Détails d'une technologie
- `POST /api/technologies` - Ajoute une nouvelle technologie
- `PUT /api/technologies/:id` - Met à jour une technologie
- `DELETE /api/technologies/:id` - Supprime une technologie

## Authentification

L'accès aux routes d'administration nécessite une authentification via JWT.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request. 
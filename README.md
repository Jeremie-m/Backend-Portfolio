# Portfolio Backend

Ce projet est le backend de mon portfolio personnel, développé avec NestJS et SQLite.

## Technologies Utilisées

- **Framework:** NestJS
- **Base de données:** SQLite avec better-sqlite3
- **Authentification:** JWT (JSON Web Tokens)
- **Documentation:** Swagger/OpenAPI
- **Validation:** class-validator et class-transformer
- **Sécurité:** bcrypt pour le hachage des mots de passe, rate limiting

## Structure du Projet

Le projet est organisé autour de trois entités principales :
- **Projets:** Gestion des projets du portfolio
- **Blog:** Système de blog avec articles et tags
- **Technologies:** Liste des technologies maîtrisées

## Fonctionnalités

- CRUD complet pour les projets, articles de blog et technologies
- Système d'authentification JWT avec rôle admin
- Protection contre les attaques par force brute (rate limiting)
- Pagination et filtres pour toutes les listes
- Gestion des tags pour les articles de blog
- Documentation API interactive avec Swagger

## Installation

1. Cloner le projet
```bash
git clone [URL_DU_REPO]
cd backend-portfolio
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
npm run start:dev
```

## Documentation API

La documentation complète de l'API est disponible via Swagger UI :
- En développement : http://localhost:3000/docs
- En production : http://votre-domaine.com/docs

## API Routes

### Projets
- `GET /api/projects` - Liste tous les projets (pagination, filtres)
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Crée un nouveau projet (admin)
- `PUT /api/projects/:id` - Met à jour un projet (admin)
- `DELETE /api/projects/:id` - Supprime un projet (admin)

### Blog
- `GET /api/blog` - Liste tous les articles (pagination, filtres, tags)
- `GET /api/blog/:id` - Détails d'un article
- `POST /api/blog` - Crée un nouvel article (admin)
- `PUT /api/blog/:id` - Met à jour un article (admin)
- `DELETE /api/blog/:id` - Supprime un article (admin)

### Technologies
- `GET /api/technologies` - Liste toutes les technologies (pagination, filtres, tri)
- `GET /api/technologies/:id` - Détails d'une technologie
- `POST /api/technologies` - Ajoute une nouvelle technologie (admin)
- `PUT /api/technologies/:id` - Met à jour une technologie (admin)
- `DELETE /api/technologies/:id` - Supprime une technologie (admin)

### Authentification
- `POST /api/auth/login` - Connexion (avec rate limiting)

## Sécurité

- Authentification requise pour toutes les opérations de modification
- Rate limiting sur la route de login (5 tentatives par minute)
- Validation des données entrantes
- Hachage des mots de passe avec bcrypt
- Protection CORS
- Préfixe global /api pour toutes les routes

## Scripts disponibles

- `npm run build` - Compile le projet
- `npm run start` - Lance le serveur en mode production
- `npm run start:dev` - Lance le serveur en mode développement avec hot reload
- `npm run start:debug` - Lance le serveur en mode debug
- `npm run lint` - Vérifie le style du code
- `npm run test` - Lance les tests unitaires

# Portfolio Backend

Ce projet est le backend de mon portfolio personnel, développé avec NestJS et SQLite, entièrement en TypeScript.

## Technologies Utilisées

- **Framework:** NestJS
- **Langage:** TypeScript
- **Base de données:** SQLite avec better-sqlite3
- **Authentification:** JWT (JSON Web Tokens)
- **Documentation:** Swagger/OpenAPI
- **Validation:** class-validator et class-transformer
- **Sécurité:** bcrypt pour le hachage des mots de passe (salt factor 12), rate limiting, validation regex

## Structure du Projet

Le projet est organisé autour des entités principales :
- **Projets:** Gestion des projets du portfolio
- **Skills:** Liste des technologies maîtrisées
- **AboutMe:** Informations personnelles et présentation
- **HeroBanner:** Textes défilants pour la bannière d'accueil
- **Auth:** Système d'authentification et contrôle d'accès

## Fonctionnalités

- CRUD complet pour les projets, compétences et textes de la Hero Banner
- Système d'authentification JWT avec rôle admin
- Protection contre les attaques par force brute (rate limiting configurable)
- Validation avancée des données avec expressions régulières
- Pagination et filtres pour toutes les listes
- Gestion du contenu "À propos de moi"
- Documentation API interactive avec Swagger

## Installation

1. Cloner le projet
```bash
git clone https://github.com/Jeremie-m/Backend-Portfolio.git
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
# ADMIN_EMAIL - Email de l'administrateur (défaut: admin@example.com)
# ADMIN_PASSWORD - Mot de passe administrateur (défaut: P@ssw0rd123!)
# JWT_SECRET - Clé secrète pour les tokens JWT
```

4. Lancer le serveur de développement
```bash
npm run start:dev
```

## Documentation API

La documentation complète de l'API est disponible via Swagger UI :
- En développement : http://localhost:3001/api/docs
- En production : http://votre-domaine.com/api/docs

## API Routes

### Projets
- `GET /api/projects` - Liste tous les projets (pagination, filtres)
- `GET /api/projects/:id` - Détails d'un projet
- `POST /api/projects` - Crée un nouveau projet (admin)
- `PUT /api/projects/:id` - Met à jour un projet (admin)
- `DELETE /api/projects/:id` - Supprime un projet (admin)

### Skills
- `GET /api/skills` - Liste tous les skills (pagination, filtres, tri)
- `GET /api/skills/:id` - Détails d'une technologie
- `POST /api/skills` - Ajoute une nouvelle technologie (admin)
- `PUT /api/skills/:id` - Met à jour une technologie (admin)
- `DELETE /api/skills/:id` - Supprime une technologie (admin)

### AboutMe
- `GET /api/about-me` - Obtient les informations "À propos de moi"
- `PUT /api/about-me` - Met à jour les informations "À propos de moi" (admin)

### Hero Banner
- `GET /api/herobanner` - Liste tous les textes de la Hero Banner (pagination, filtres)
- `GET /api/herobanner/:id` - Détails d'un texte
- `POST /api/herobanner` - Ajoute un nouveau texte (admin)
- `PUT /api/herobanner/:id` - Met à jour un texte (admin)
- `DELETE /api/herobanner/:id` - Supprime un texte (admin)

### Authentification
- `POST /api/auth/login` - Connexion (avec rate limiting)

## Sécurité

- **Authentification JWT** pour contrôler l'accès aux routes protégées
- **Validation stricte des entrées** avec class-validator et expressions régulières
- **Protection contre les injections SQL** grâce aux requêtes paramétrées
- **Rate limiting ciblé** sur les routes sensibles comme le login
- **Hachage des mots de passe** avec bcrypt (facteur de salt 12)
- **Vérification des rôles** pour les opérations administratives
- **Protection CORS** configurable

## Validation des entrées

Les entrées utilisateur sont validées à plusieurs niveaux :
- **DTO avec décorateurs** pour la validation structurelle
- **Expressions régulières** pour valider le format des données sensibles (email, mot de passe)
- **Contraintes SQL** au niveau de la base de données

## Scripts disponibles

- `npm run build` - Compile le projet
- `npm run start` - Lance le serveur en mode production
- `npm run start:dev` - Lance le serveur en mode développement avec hot reload
- `npm run start:debug` - Lance le serveur en mode debug
- `npm run lint` - Vérifie le style du code
- `npm run test` - Lance les tests unitaires

## Tests API

Le projet inclut un fichier pour tester l'API avec l'extension REST Client de VS Code. Pour l'utiliser :
1. Installez l'extension REST Client dans VS Code
2. Ouvrez le fichier `tests.http`
3. Cliquez sur "Send Request" au-dessus de chaque requête
4. Utilisez le token JWT obtenu via login pour les requêtes protégées
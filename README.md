# VRACK — Site Officiel

Ceci est le dépôt du site officiel du groupe VRACK — site visible à l'adresse : https://www.vrack.fr

Description
-----------
Ce dépôt contient l'application web pour le groupe VRACK avec les pages suivantes :
- `Photos` : galerie photo (lightbox/carousel pour chaque catégorie)
- `Videos` : intégration de vidéos YouTube
- Pages standard : Accueil, Concerts, Albums, Contact, Admin, etc.

Structure principale
--------------------
- `client/` : code front-end (Vite + React + TypeScript)
- `server/` : serveur Node.js (API, trpc, etc.)
- `drizzle/` : migrations et schéma de base de données
- `shared/` : types et constantes utilisées côté client/serveur

Développement local
-------------------
Prérequis : Node 18+, pnpm

Installation :
```powershell
pnpm install
```

Démarrer en mode développement :
```powershell
pnpm dev
```

Gestion des images & vidéos
--------------------------
- Les images statiques sont placées par défaut sous `client/public/images/photos/`.
- Pour regrouper des images en galerie (ex. un concert), ajoutez un tableau `sub_photos` dans la constante `PHOTOS` du fichier `client/src/pages/Photos.tsx` (ex. `sub_photos: ['/images/photos/mediteraneo/1.png', '/images/photos/mediteraneo/2.png']`).
- Les vidéos sont stockées dans `client/src/pages/Videos.tsx` (liste `VIDEOS`) et s'ouvrent dans une iframe.

Contribuer
---------
- Fork & PR workflow standard.
- Utilisez des messages de commit clairs (ex: `feat: add photo gallery`, `fix: lightbox navigation`).

Licence
-------
Ce projet est sous licence MIT — voir `package.json` pour les détails.

Contact
-------
Pour toute question, contactez l'administrateur du projet ou l'équipe VRACK.

---
_Fichier généré automatiquement par l’outil d’aide au développement._

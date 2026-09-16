# Sixt Frontend

Clone du site Sixt (location de véhicules) en React/Vite. Recherche d'agence,
catalogue filtrable, configuration d'offre (protections/options) et tunnel de
réservation. Consomme l'API [`sixt-backend`](../sixt-backend).

## Démo

**[luana-deoliveira-sixt.netlify.app](https://luana-deoliveira-sixt.netlify.app/)**

![Démo du site Sixt](./demo.png)

## Stack

- **React 18** + **Vite**
- **react-router-dom**, **react-select**, **MUI** (`@mui/x-date-pickers` pour les dates)
- **axios**, **date-fns** / **dayjs**
- **react-responsive-carousel**

## Démarrage

```bash
npm install
cp .env.example .env.local   # adapte VITE_API_URL si besoin
npm run dev                  # http://localhost:5173
```

### Variables d'environnement

| Variable | Rôle |
|---|---|
| `VITE_API_URL` | URL de base de l'API backend. Par défaut `http://localhost:3000` si absente (voir `src/config.js`). |

⚠️ Vite fige `VITE_API_URL` **au moment du build** : en local, un simple redémarrage
de `npm run dev` suffit après modification de `.env.local`. En revanche sur
Netlify (ou tout hébergeur statique), il faut définir cette variable dans les
réglages du site **et redéployer** (changer la variable seule ne suffit pas —
le bundle déjà construit ne se met pas à jour tout seul).

## Structure

```
sixt-frontend/
├── src/
│   ├── pages/         # Home, OfferList, OfferConfig, PersonnalDetails, BackOffice
│   ├── components/    # Header, LocationSearch, RentOffersCards, Modal, ...
│   ├── utils/         # calculateTotalPrice, handleDisableButton
│   ├── assets/        # images + police d'icônes "sixt" (iconsStyle.css)
│   └── config.js      # API_URL (VITE_API_URL)
└── public/_redirects  # fallback SPA pour le routing côté client (Netlify)
```

## Déploiement

Déployé sur **Netlify** (`luana-deoliveira-sixt.netlify.app`), CI/CD sur la
branche `main` du repo GitHub `LuaGeo/sixt-frontend`. Le routing SPA est géré
par `public/_redirects`.

Backend : [`sixt-backend`](../sixt-backend), déployé sur Northflank.

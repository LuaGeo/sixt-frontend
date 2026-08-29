// URL de base de l'API backend.
// - En local : laisse la valeur par défaut (http://localhost:3000) ou crée un
//   fichier .env.local avec VITE_API_URL=http://localhost:3000
// - En production : définis VITE_API_URL sur l'URL du backend déployé
//   (ex. https://site--sixt-backend--6v4khcscf8qp.code.run)
export const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

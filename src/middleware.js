// Fichier middleware.js
import { useEffect } from 'react';

export default function useMiddleware() {
  useEffect(() => {
    const queryString = window.location.search.substring(1);
    envoyerChaineRequeteAuServeur(queryString);
  }, []);

  const envoyerChaineRequeteAuServeur = async (queryString) => {
    try {
      const response = await fetch('http://localhost:3001/api/receive-query-string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryString }),
      });

      if (!response.ok) {
        throw new Error('Erreur réseau lors de l’envoi de la chaîne de requête.');
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
}

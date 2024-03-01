import { useEffect } from 'react';
import axios from 'axios';

export default function useMiddleware() {

  useEffect(() => {
    // Création d'une fonction asynchrone pour effectuer la requête
    const sendVisitData = async () => {
      try {
        const queryString = window.location.search; // Capture la query string

        const visitData = {
          timestamp: new Date().toISOString(),
          method: 'GET', // Vous pouvez utiliser 'GET' ou 'POST' en fonction de vos besoins
          
          path: window.location.pathname,
          queryString: queryString, // Ajoute la query string aux données envoyées
          url: window.location.href,
          referer: document.referrer,
          userAgent: navigator.userAgent,

          // Autres données que vous souhaitez envoyer
        };
        console.log(visitData)
        await axios.post('https://beta.cyber-shield.fr/api2/visits', visitData);
      } catch (error) {
        console.error('Erreur lors de l’envoi des données de visite:', error);
      }
    };

    // Appel de la fonction fetchData
    sendVisitData();
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une fois après le premier rendu
}

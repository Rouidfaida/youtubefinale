import { useEffect } from 'react';
import axios from 'axios';

export default function useMiddleware() {

  useEffect(() => {
    // Création d'une fonction asynchrone pour effectuer la requête
    const sendVisitData = async () => {
      try {
        const queryString = window.location.search; // Capture la query string

        const visitData = {
          // timestamp: new Date().toISOString(),
          method: 'GET', // Ce champ 'method' n'est pas nécessaire pour la requête Axios, mais vous pouvez le conserver si c'est utile pour les données envoyées.
          path: window.location.pathname,
          queryString: queryString, // Ajoute la query string aux données envoyées
          url: window.location.href,
          referer: document.referrer,
          userAgent: navigator.userAgent,
          // Autres données que vous souhaitez envoyer
        };
        
        // Vérifiez l'URL ici, assurez-vous qu'elle est correcte et que le serveur est en écoute
        await axios.post('https://beta.cyber-shield.fr/api2/visits', visitData);
      } catch (error) {
        console.error('Erreur lors de l’envoi des données de visite:', error);
      }
    };

    // Appel de la fonction fetchData
    sendVisitData();
  }, []); // Le tableau vide [] assure que l'effet ne s'exécute qu'une fois après le premier rendu
}

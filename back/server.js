
// // // const express = require('express');
// // // const cors = require('cors');
// // // const useragent = require('express-useragent');
// // // const recievereq=require('./apiRoutes');

// // // const app = express();
// // // // Autoriser toutes les origines (attention en production)
// // // app.use(cors());

// // // app.use(express.json()); // Pour analyser les requêtes JSON
// // // app.use(express.urlencoded({ extended: true })); // Pour analyser les requêtes avec des corps encodés en URL

// // // app.use(useragent.express()); // Utilisation du middleware express-useragent
// // // app.use('/api2',recievereq)

// // // app.listen(4001, () => {
// // //   console.log('Serveur Proxy en écoute sur le port 4001');
// // // });
// // require('dotenv').config(); // Placez cette ligne en haut de votre fichier principal (par exemple, server.js)
// // const express = require('express');
// // const cors = require('cors');
// // const useragent = require('express-useragent');
// // const recievereq = require('./apiRoutes');
// // const { checkActivation } = require('./controllers/apikeyController'); // Importation de la fonction
// // const config = require('./config');
// // const { registerModules, registerSettings } = require('./controllers/loadmodule.controller');

// // const app = express();
// // console.log('first',config.api_key)
// // // Configuration de l'application Express
// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(useragent.express());
// // app.use('/api2', recievereq);
// // loadModule().then(() => {
// //   // Enregistrer les modules et les paramètres
// //   registerModules().then(() => {
// //       console.log('Modules enregistrés avec succès');
// //   }).catch(err => {
// //       console.error('Erreur lors de l’enregistrement des modules:', err);
// //   });

// //   registerSettings().then(() => {
// //       console.log('Paramètres enregistrés avec succès');
// //   }).catch(err => {
// //       console.error('Erreur lors de l’enregistrement des paramètres:', err);
// //   });}
// // // Vérification de l'API Key avant de démarrer le serveur
// // checkActivation().then(() => {
// //   app.listen(4001, () => {
// //     console.log('Serveur Proxy en écoute sur le port 4001');
// //   });
// // }).catch(err => {
// //   console.error('Échec au démarrage du serveur:', err);
// //   // Vous pouvez décider ici d'arrêter le processus si la vérification échoue
// //   // process.exit(1);
// // });
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const useragent = require('express-useragent');
// const recievereq = require('./apiRoutes');
// const { checkActivation } = require('./controllers/apikeyController');
// const { loadModule, registerModules, registerSettings, processRequest, logVisit, setIsUnderAttack } = require('./controllers/loadmodule.controller'); // Assurez-vous que loadModule est exporté

// const app = express();
// app.use(cors());

// const session = require('express-session');

// app.use(session({
//     secret: 'faida', // Utilisez un secret unique pour votre application
//     resave: false,
//     saveUninitialized: true,
// }));

// // Plus de configuration pour votre application Express...

// // Configuration de l'application Express
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(useragent.express());
// // app.use('/api2', recievereq);

// // Endpoint pour recevoir les données de log
// // app.use('/api2', recievereq);
// // only log the visit if we are not attacked
// app.post('/api2/visits', (req, res) => {
// // console.log('errrr',res)
// // console.log('tyyyyy',req)
// })

// // Puis, définissez les middlewares spécifiques à l'API comme montré précédemment

//   // Middleware pour ajouter des en-têtes de réponse
// app.use((req, res, next) => {
//     console.log('first',res)
//   // Sécurité: Empêcher le navigateur d'interpréter les fichiers comme autre chose que leur type MIME déclaré
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   // Sécurité: Cliquer sur la protection de détournement
//   res.setHeader('X-Frame-Options', 'sameorigin');
//   // CSP: Définir une politique de sécurité du contenu
//   res.setHeader('X-Powered-By', 'SECURAS');

//   next();
// });
// // Chargement des modules, enregistrement, puis démarrage du serveur
// async function initializeServer() {
//     try {
//         await loadModule();
//         console.log('Modules chargés avec succès');

//         await registerModules();
//         console.log('Modules enregistrés avec succès');

//         await registerSettings();
//         console.log('Paramètres enregistrés avec succès');

//         await checkActivation();
//         console.log('API Key vérifiée avec succès');

//         app.listen(4001, () => {
//             console.log('Serveur Proxy en écoute sur le port 4001');
//         });
//     } catch (err) {
//         console.error('Échec lors de l’initialisation du serveur:', err);
//         process.exit(1);
//     }
// }

// initializeServer();
const http = require('http');
const httpProxy = require('http-proxy');

// Créer une instance de proxy
const proxy = httpProxy.createProxyServer({});

// Créer un serveur HTTP qui écoute sur le port 8080
http.createServer(function(req, res) {
  // Ici, vous pouvez ajouter votre logique de WAF pour inspecter les requêtes
  // et décider si elles doivent être bloquées ou autorisées.
  // Si la requête est autorisée, transmettez-la au serveur web :
  
  proxy.web(req, res, { target: 'http://youtube.cyber-shield.fr' });
}).listen(8080, () => {
  console.log('Proxy inverse écoutant sur le port 8080');
});

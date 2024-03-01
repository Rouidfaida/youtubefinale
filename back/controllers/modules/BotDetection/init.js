require('dotenv').config();
const config = require('../../../config');
const { getOption } = require('../../../api');
const { getRealIP } = require('../../../ipDetail');
const  getBotsList =require('./extra');
const fs = require('fs').promises; // Assurez-vous d'utiliser les promesses ici
const path = require('path');


const main = async (req, res, next) => {
  // console.log('rettrrrrr',req)
  const ua = req.useragent;
  // const ua = req.body.useragent;
  const protocol = req.protocol; // 'http' ou 'https'
          const siteUrl = `${protocol}://${req.headers.origin}${req.originalUrl}`;
          const ip =await getRealIP(req);
          // console.log(first)
          // console.log('useragent',ua)

try {
  if (await getOption('detect_bots')) {
    if (await getOption('bad_bots')) {
        // const userAgent = req.headers['user-agent'].toLowerCase();
        for (const bot of getBotsList()) {
            if (ua.includes(bot.toLowerCase())) {
                // Bot détecté, effectuer des actions
                console.log('redffff',bot)

                if (await getOption('email_notif') && await getOption('c_bot_email_notif')) {
                  axios.post(`${config.apiEndpoint}/api/email/sendEmail`, {
                    type: 'bot',
                    site_url: req.body.url,
                    referer: req.body.referer,
                  
                    browser: ua.browser,
                    os: ua.os,
                    ip: ip,
                    apiKey:config.api_key
                });
                }

                if (await getOption('log') && await getOption('c_bot_log')) {
                  addLogEntry(req,res,'bot')

                }

                // if (await getOption('autoban') && await getOption('c_bot_autoban')) {
                //     // Implémentez la logique de bannissement ici
                // }

                break; // Sortir de la boucle une fois un bot détecté
            }
        }
    }

    if (!await getOption('allow_search_bots')) {
        // Liste des bots de moteurs de recherche
        const searchBots = ['Googlebot', 'Baiduspider', 'ia_archiver',
        'R6_FeedFetcher', 'NetcraftSurveyAgent',
        'Sogou web spider', 'bingbot', 'Yahoo! Slurp',
        'facebookexternalhit', 'PrintfulBot', 'msnbot',
        'Twitterbot', 'UnwindFetchor', 'urlresolver' ];
        const ua = req.useragent

        for (const bot of searchBots) {
            if (ua.includes(bot)) {
                res.setHeader("X-Robots-Tag", "noindex, nofollow");
                res.status(404).send('Not found');
                return;
            }
        }
    }
}
// next();
} catch (error) {
  
}
   
}
const info=() =>{
  // const api_key = get_option('api_key');
  return {
      id: "4",
      apiKey: config.api_key,
      version: "1.0.0",
      name: "Détection des Robot",
      description: "Détection des Robot"
  };
}
const getOptions = async () => {
  try {
      const optionsFilePath = path.join(__dirname, 'options.json'); // Utilisez le chemin absolu ici
      const optionsData = await fs.readFile(optionsFilePath, 'utf8');
      const options = JSON.parse(optionsData);
      return options;
  } catch (error) {
      console.error('Erreur lors de la lecture des options:', error);
      return null;
  }
};
// Fonction pour récupérer les paramètres du module
function getSettings() {
  // Retournez les paramètres du module ici, le cas échéant
  return [];
}
module.exports = {
  info,
  main,
  getOptions,
  getSettings
};
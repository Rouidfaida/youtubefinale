require('dotenv').config(); // Placez cette ligne en haut de votre fichier principal (par exemple, server.js)

const fs = require('fs').promises; // Assurez-vous d'utiliser les promesses ici
const path = require('path');
const axios = require('axios');
const express = require('express');

const config = require('../config'); // Assurez-vous que ce fichier existe et contient les bonnes configurations
const { addLogEntry } = require('./logEnryController');

const app = express();


// Un objet pour stocker les modules chargés
const loadedModules = {};
        let underAttack = false;
        
   exports.setIsUnderAttack = (value) => {
    underAttack = value;
  };
//   console.log('trtttunderattack',underAttack)


// Middleware pour traiter les requêtes avec chaque module
exports.processRequest = async (req, res, next) => {
//    console.log('eree',req)
    for (const moduleName in loadedModules) {
        const module = loadedModules[moduleName];
        
        await module.main(req, res, next);
 } if(!underAttack){
        addLogEntry(req,res,'visit')
        }
};
exports.loadModule = async () => {
    // console.log(config.apiEndpoint)
    // loadedModules = modules;
    try {
        const modulesDir = path.join(__dirname, 'modules');
        const moduleFolders = await fs.readdir(modulesDir, { withFileTypes: true });

        for (const folder of moduleFolders) {
            if (folder.isDirectory()) {
                // console.log(folder.name)
                const initFilePath = path.join(modulesDir, folder.name, 'init.js');
                const moduleUrl = new URL(`file://${initFilePath.replace(/\\/g, '/')}`);

                try {
                    const module = await require(initFilePath);
                    // console.log('first',module)
                    // console.log(`Module ${folder.name} chargé :`, module);
                    // Stocker le module chargé
                    loadedModules[folder.name] = module;
                    // console.log('trrrrr',loadedModules)
                } catch (error) {
                    console.error(`Échec du chargement du module ${folder.name}:`, error);
                }
            }
        }
        // app.use(processRequest);

    } catch (error) {
        console.error('Erreur lors du chargement des modules:', error);
    }
};

exports.registerModules = async () => {
    try {
        const messages = [];
        for (const moduleName in loadedModules) {
            const module = loadedModules[moduleName];
            const moduleInfo = module.info();
            const apiUrl = `${config.apiEndpoint}/api/module/check-registered-module/${moduleInfo.id}?apiKey=${config.api_key}`;

            const response = await axios.get(apiUrl);
            const options = await module.getOptions();
            const settings = await module.getSettings();
            if (!response.data.registered) {
                const payload = {
                    apiKey: config.api_key,
                    name: moduleInfo.name,
                    version: moduleInfo.version,
                    description: moduleInfo.description,
                    id: moduleInfo.id,
                    options: options,
                    settings:settings
                };

                const res = await axios.post(`${config.apiEndpoint}/api/module/register-module`, payload);
                messages.push(res.data);
            }
        }
        return messages;
    } catch (error) {
        console.error('Erreur lors de l’enregistrement des modules:', error);
        throw error;
    }
};
exports.registerSettings = async () => {
    try {
        const messages = [];
        const apiUrl = `${config.apiEndpoint}/api/module/check-registered-module/0?apiKey=${config.api_key}`;

        const response = await axios.get(apiUrl);

        if (!response.data.registered) {
            // const options = require('./options'); // Assurez-vous que ce fichier existe
            // const settings = require('./settings'); // Assurez-vous que ce fichier existe
            const options = await getOptions();
            const settings = await getSettings();
            const payload = {
                apiKey: config.api_key,
                name: "app",
                version: "1.0.0",
                description: "the global options",
                id: 0,
                options: options,
                settings: settings
            };

            const res = await axios.post(`${config.apiEndpoint}/api/module/register-module`, payload);
            messages.push(res.data);
        }

        return messages;
    } catch (error) {
        console.error('Erreur lors de l’enregistrement des paramètres:', error);
        throw error;
    }
};


const getOptions = async () => {
    try {
        const optionsFilePath = path.join(__dirname, './App/options.json'); // Utilisez le chemin absolu ici
        const optionsData = await fs.readFile(optionsFilePath, 'utf8');
        const options = JSON.parse(optionsData);
        return options;
    } catch (error) {
        console.error('Erreur lors de la lecture des options:', error);
        return null;
    }
  };
  
   const getSettings = async () => {
    try {
     const  settingsFilePath = path.join(__dirname, './App/settings.json'); // Utilisez le chemin absolu ici
        const settingsData = await fs.readFile(settingsFilePath, 'utf8');
        const settings = JSON.parse(settingsData);
        return settings;
    } catch (error) {
        console.error('Erreur lors de la lecture des settings:', error);
        return null;
    }
  };



// Pseudo-code, nécessite une implémentation réelle
const checkBan = async (req, res, next) => {
    const ip = getRealIP(req); // Fonction pour obtenir l'IP réelle
    const bannedStatus = await checkIfBanned(ip); // Fonction pour vérifier si l'IP est bannie
  
    if (bannedStatus) {
      const redirectUri = getRedirectUri(); // Fonction pour obtenir l'URI de redirection
      return res.redirect(redirectUri);
    }
  
    next();
  };
  exports.getOptionsN = async () => {
    try {
        const response = await axios.get(`${config.apiEndpoint}/api/options/get-options/${config.api_key}`);
        // console.log('Réponse complète de l\'API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des options:', error);
        throw error;
    }
};
  exports.getSettingsN = async () => {
    try {
        const response = await axios.get(`${config.apiEndpoint}/api/settings/get-settings/${config.api_key}`);
        // console.log('Réponse complète de l\'API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des options:', error);
        throw error;
    }
};

  app.use(checkBan);
    
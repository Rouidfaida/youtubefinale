require('dotenv').config();
const config = require('../../../config');

const path = require('path');
const { getOption, getSetting } = require('../../../api');
const { getRealIP } = require('../../../ipDetail');
const fs = require('fs').promises;
const net = require('net');
const { addLogEntry } = require('../../logEnryController');
const { default: axios } = require('axios');
const { setIsUnderAttack } = require('../../loadmodule.controller');

const main=async(req,res,next)=>{  
          let   proxyv = 0;
          const ua = req.useragent;
          const protocol = req.protocol; // 'http' ou 'https'
          const siteUrl = `${protocol}://${req.headers.origin}${req.originalUrl}`;
          const ip =await getRealIP(req);

    if (await getOption('sus_user_protection')&& await getOption('protect') ) {
        // console.log('first',await getSetting('detect_method'))
        if (await getSetting('detect_method') === 'iphub') {
            const key =await getSetting('iphub_key');
            // console.log('reer',key)
            if(!key){
                return
            }
            const ip =await getRealIP(req);
            try {
                const url = `http://v2.api.iphub.info/ip/${ip}`;
                const response = await axios.get(url, {
                    headers: { 'X-Key': key }
                });

                const block = response.data.block;
                if (block) {
                    proxyv = 1;
                   
                }

                // Continuez avec le reste de votre logique...
            } catch (error) {
                console.error('Erreur lors de la vérification de l’IP :', error);
            }
        }
        else if (await getSetting('detect_method') === 2) {
            // Si la méthode de détection est 'proxycheck'
            const key = getSetting('proxycheck_key');
            if (!key) {
                return;
            }
    
            const ip =await getRealIP(req);
            try {
                const url = `http://proxycheck.io/v2/${ip}?key=${key}&vpn=1`;
                const response = await axios.get(url);
    
                const jsonc = response.data;
                if (jsonc && jsonc[ip] && jsonc[ip].proxy === "yes") {
                     proxyv = 1;
                    // Vous pouvez effectuer une action ici si l'IP est détectée comme proxy
                    // Par exemple, retourner une erreur ou rediriger
                }
    
                // Continuez avec le reste de votre logique...
            } catch (error) {
                console.error('Erreur lors de la vérification du proxy :', error);
                // Gérez l'erreur comme vous le souhaitez
            }
        }
        else if (await getSetting('detect_method') === 3) {
            // Si la méthode de détection est 'iphunter'
            const key = getSetting('iphunter_key');
            if (!key) {
                return;
            }
    
            const ip =await getRealIP(req);
            const url = `https://www.iphunter.info:8082/v1/ip/${ip}`;
    
            try {
                const response = await axios.get(url, {
                    headers: { 'X-Key': key }
                });
    
                if (response.status === 200 && response.data.data.block === 1) {
                     proxyv = 1;
                    // Vous pouvez effectuer une action ici si l'IP est bloquée
                    // Par exemple, retourner une erreur ou rediriger
                }
    
                // Continuez avec le reste de votre logique...
            } catch (error) {
                console.error('Erreur lors de la vérification de l’IP avec iphunter :', error);
                // Gérez l'erreur comme vous le souhaitez
            }
        }
        else if(await getOption('header_method')) {
            // Vérifie les headers HTTP pour détecter un proxy
            const proxyHeaders = [
                'via',
                'x-forwarded-for',
                'forwarded-for',
                'x-forwarded',
                'x-forwarded-host',
                'forwarded',
                'forwarded-for-ip',
                'forwarded-proto',
                'proxy-connection'
            ];
    
            for (const header of proxyHeaders) {
                if (req.headers[header]) {
                    proxyv = 1;
                    break;
                }
            }}
            else if( await getOption('port_scan')) {
                const ports = [8080, 80, 1080, 3128, 4145, 32231, 53281];
                const ip =await getRealIP(req);

                for (const port of ports) {
                    const result = await checkPort(ip, port);
                    if (result) {
                        proxyv = 1;
                        break;
                    }
                }}
                if (proxyv === 1) {
                    //Logging
                   // Journalisation si l'option est activée
                    if (await getOption('log')) {
                        if (await getOption('c_sus_log')) {
                           addLogEntry(req,res,'Visiteurs suspects');
                        }
                    }
                //   console.log('er', await getOption('email_notif') && await getOption('c_sus_email_notif'))
               
                    if ( await getOption('email_notif') && await getOption('c_sus_email_notif')) {
                        axios.post(`${config.apiEndpoint}/api/email/sendEmail`, {
                            type: 'Visiteurs suspects',
                            site_url: req.body.url,
                            referer: req.body.referer,
                          
                            browser: ua.browser,
                            os: ua.os,
                            ip: ip,
                            apiKey:config.api_key
                        });
                    }
                      setIsUnderAttack(true)
                }
    }
    // next();

}
const  checkPort=(ip, port) =>{
    return new Promise(resolve => {
        const socket = net.createConnection(port, ip);

        const onError = () => {
            socket.destroy();
            resolve(false);
        };

        socket.setTimeout(30000);
        socket.once('error', onError);
        socket.once('timeout', onError);
        socket.once('connect', () => {
            socket.end();
            resolve(true);
        });
    });}
const info=()=>{
    // const apiKey = this.getConfig('APP_KEY');

 
       return {
           id: '2',
           apiKey: config.api_key,
           version: '1.0.0',
           name: 'Suspicious user prevention"',
           description: "Prevent Users who's connected to proxy or a some sort of vpn",
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
  
   const getSettings = async () => {
    try {
     const  settingsFilePath = path.join(__dirname, 'settings.json'); // Utilisez le chemin absolu ici
        const settingsData = await fs.readFile(settingsFilePath, 'utf8');
        const settings = JSON.parse(settingsData);
        return settings;
    } catch (error) {
        console.error('Erreur lors de la lecture des settings:', error);
        return null;
    }
  };
  
  module.exports = {
    info,
    main,
    getOptions,
    getSettings,
};
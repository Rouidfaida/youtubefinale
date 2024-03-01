const axios = require("axios");
const config = require("../config");
const { getRealIP, ipDetails } = require("../ipDetail");
const url = require('url'); // Module URL natif de Node.js

exports.addLogEntry = async (req, res, type) => {
    try {
        // console.log('reeeeq',req)
       
        const ua = req.useragent;
        const ip =await getRealIP(req);
        // console.log(req.body);
        const detail=await ipDetails(ip)
        // console.log('reeeq',req)
        const siteUrl = req.body.url;
const parsedUrl = new URL(siteUrl);
const domain = parsedUrl.hostname; // Extrait uniquement le nom d'hôte (domaine)
refer=`${parsedUrl.pathname}${parsedUrl.search}`

        const reqData = {
            apiKey: config.api_key, 
            ip: ip,
            page:refer,
            useragent: ua.source,
            query: req.body.queryString,
           
            browser: ua.browser,
            os: ua.os,
            type: type,
            platform: ua.platform,
            isMobile: ua.isMobile,
            ipAddress: ip,
            country:detail.country,
            country_code : detail.country_code,
            region : detail.region,
            city : detail.city,
            latitude : detail.latitude,
            longitude : detail.longitude,
            isp : detail.isp,
            // useragent : ,
            referer_url:refer,
            domain : domain,
        };

        console.log('Données de visite reçues:', reqData);
    
        const response = await axios.post(`${config.apiEndpoint}/api/log/logEntry`, reqData);
        // Renvoyer uniquement les données pertinentes au client
        // res.status(200).json({ message: 'Données de visite reçues' });
    } catch (error) {
        console.error('Erreur lors de l’envoi des données:', error);
        // Renvoyer un message générique au client
        // res.status(500).json({ message: 'Erreur lors de l’envoi des données' });
    }
};

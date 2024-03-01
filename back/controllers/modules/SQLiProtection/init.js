require('dotenv').config();

const path = require('path');
const { addLogEntry } = require('../../logEnryController');
const { getRealIP } = require('../../../ipDetail');
const { default: axios } = require('axios');
const config = require('../../../config');
const { logVisit, setIsUnderAttack, getOptionsN } = require('../../loadmodule.controller');
const { getOption } = require('../../../api');
// const { getIp, getUserAgent } = require('../../donneejs.controller');
// const { addLogEntry } = require('../../logEntry.controller');

const fs = require('fs').promises;

const main = async (req, res, next) => {
    try {
  
              const options=await getOption('xss_protection')
        // console.log('optionnnnn',await getOption('xss_protection'))
        // const options = JSON.parse(optionsData);
        if( await getOption('protect') && (await getOption('sqli_protection'))) {
        if (await getOption('xss_protection')) {
         res.set("X-XSS-Protection", "1")
        }
    
        if (await getOption('clickjacking_protection')) {
            res.set("X-Frame-Options", "sameorigin");
        }
    
        if (await getOption('mimemis_protection')) {
            res.set("X-Content-Type-Options", "nosniff");
        }
    
        if (await getOption('force_secure_conn')) {
            res.set("Strict-Transport-Security", "max-age=15552000; preload");
        }
    
        if (await getOption('hide_php_ver')) {
            res.set('X-Powered-By', 'SECURAS');
        }
    
    //     if (options.sanitize_input) {
    //         // Appliquez la logique de sanitisation ici
    //     }
    
    //     if (options.sanitize_data) {
    //         req.body = sanitize(req.body);
    //         req.query = sanitize(req.query);
    //         req.cookies = sanitize(req.cookies);
    //         // etc.
    //     }
   
        // Itérer sur chaque option et appliquer la logique de sécurité corresponsepondante
        // options.forEach(option => {
        //     switch (option.name) {
        //         case 'sqli_protection':
        //             if (option.value) {
        //                 // Appliquer la logique de protection SQLi
        //             }
        //             break;
        //         case 'xss_protection':
        //             if (option.value) {
        //                 response.setHeader("X-XSS-Protection", "1; mode=block");
        //             }
        //             break;
        //         case 'clickjacking_protection':
        //             if (option.value) {
        //                 response.setHeader("X-Frame-Options", "SAMEORIGIN");
        //             }
        //             break;
        //         case 'mimemis_protection':
        //             if (option.value) {
        //                 response.setHeader("X-Content-Type-Options", "nosniff");
        //             }
        //             break;
        //         case 'force_secure_conn':
        //             if (option.value) {
        //                 response.setHeader("X-Powered-By", "SECURAS");
        //             }
        //             break;
        //         case 'hide_php_ver':
        //             if (option.value) {
        //                 response.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains; preload");
        //             }
        //             break;
        //         case 'sanitize_input':
        //             // Appliquer la logique de désinfection des entrées
        //             break;
        //         // ... ajoutez des cas supplémentairesponse pour d'autresponse options
        //         // case 'sanitize_data':
        //         //     if (option.value) {
        //         //         req.body = sanitize(req.body);
        //         //         req.query = sanitize(req.query);
        //         //         req.cookies = sanitize(req.cookies);
        //         //         if (req.session) {
        //         //             req.session = sanitize(req.session);
        //         //         }
        //         //     }
        //         //     break;
        //     }
        // })
      const  query_string= req?.body?.queryString;
        const query = query_string?.substring(1); // Cela enlève le '?' du début
        const patterns = [
            "+select+",
            "+union+",
            "union+",
            "+or+",
            "**/",
            "/**",
            "0x3a",
            "/*",
            "*/",
            "*",
            ";",
            "||",
            "' #",
            "or 1=1",
            "'1'='1",
            "S@BUN",
            "`",
            "'",
            '"',
            "<",
            ">",
            "++",
            "1,1",
            "1=1",
            "sleep(",
            "%27",
            "<?",
            "<?php",
            "?>",
            "../",
            "/localhost",
            "127.0.0.1",
            "loopback",
            "%0A",
            "%0D",
            "%3C",
            "%3E",
            "%00",
            "%2e%2e",
            "input_file",
            "path=.",
            "mod=.",
            "eval\\(",
            "javascript:",
            "base64_",
            "boot.ini",
            "etc/passwd",
            "self/environ",
            "echo.*kae",
            "=%27$",
            "<script",
            "onload=",
            "javascript:",
            "alert(",
            "eval(",
            "<img",
            "<iframe",
            "<object",
            "<form",
            "onerror=",
            "prompt(",
            "<a",
            "<video",
            "<audio",
            "expression(",
            "<input",
            "<meta",
            "<link",
            "<style",
            "<embed",
            "<base",
            "<frame",
            "<applet",
            "<textarea",
            "<xss",
            "<svg",
            "<math",
            "src=",
            "href=",
            "background=",
            "style=",
            "onmouseover=",
            "onmouseout=",
            "onmousedown=",
            "onmouseup=",
            "onclick=",
            "ondblclick=",
            "onmousemove=",
            "onkeypress=",
            "onkeyup=",
            "onkeydown="
        ];
        // const result = await getUserAgent()
        const ip =await  getRealIP(req);
        const ua = req.useragent;
        const protocol = req.protocol; // 'http' ou 'https'
        const siteUrl = `${protocol}://${req.headers.origin}${req.originalUrl}`;
    
        // Obtenir l'en-tête Referer, s'il existe
        const referer = req.get('referer') || null;
        if (ip == "::1") {
            ip = "127.0.0.1";
        }

        for (const pattern of patterns) {
            if (query?.toLowerCase()?.includes(pattern?.toLowerCase())) {
                // Attack detected, do everything
                const optionSqlEmailNotif = options.c_sqli_email_notif;
                // const optionEmailNotif = optionsGeneral.find(o => o.name === 'email_notif');
// console.log('trtttt',await getOption('email_notif'))
// console.log('trtttthhhh',await getOption('c_sqli_email_notif'))
                if ( await getOption('email_notif') && await getOption('c_sqli_email_notif')) {
                    axios.post(`${config.apiEndpoint}/api/email/sendEmail`, {
                        type: 'sqli/xss',
                        site_url: req.body.url,
                        referer: req.body.referer,
                      
                        browser: ua.browser,
                        os: ua.os,
                        ip: ip,
                        apiKey:config.api_key
                    });
                }
              
                // console.log('ttttrrrrrrrrrrrrrrrr',await getOption('c_sqli_log'))
                if( await getOption('log') && await getOption('c_sqli_log')){
                
                    addLogEntry(req,res,'sqli/xss')
                }
            
                // const optionSqlBan = options.find(o => o.name === 'c_sqli_autoban');
                // // const optionBan = optionsGeneral.find(o => o.name === 'autoban');
                // if (optionSqlBan.value ) {
                //     // BanManager.banIp('SQLi/XSS attempt'); // Assuming BanManager.banIp returns a Promise
                // }
                // req.app.isUnderAttack = true;
                setIsUnderAttack(true)
            }
        }}
            //  next();
    }

     

        

        // Passer à la prochaine fonction de middleware
  
     catch (error) {
        console.error('Error reading or parsing options.json:', error);
        // res.status(500).send('Internal Server Error');
    }
};
const info=()=>{

       return {
           id: '1',
           apiKey: config.api_key,
           version: '1.0.0',
           name: 'SQL injection protection',
           description: 'Sanitize requests and block any damage that can be caused by an SQLi',
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
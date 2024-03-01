// exports.verifyApikey = async (req, res) => {
//     try {
//         const { api_key, email_address } = req.params;
    
//         // Comparer avec les valeurs du fichier de configuration
//         if (api_key === config.api_key && email_address === config.email) {
//           res.json({ message: 'API Key and email are valid.', valid: true });
//           console.log('apiKey est correct')
//         } else {
//           res.status(401).json({ message: 'Invalid API Key or email.', valid: false });
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         res.status(500).json({ message: 'An error occurred while validating the API key and email.', valid: false });
//       }
// }
const axios = require('axios');
const config = require('../config');



async function validApiKey() {
    // console.log(config.apiEndpoint)
  try {
    const url = `${config.apiEndpoint}/api/api/checkApiKey/${config.api_key}/${config.email}`;
    const response = await axios.get(url);
    // console.log(response)
    return response.data.valid;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'API Key:', error);
    return false;
  }
}

async function  checkActivation(){
  if (
    !config.api_key ||
    !config.email ||
    !(await validApiKey())
  ) {
    console.error('Securas: Invalid API Key, please check your installation.');
    // process.exit(1); // Arrête le serveur en cas d'échec
  }
}


module.exports = { checkActivation };

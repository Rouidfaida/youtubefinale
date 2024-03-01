const config = require("./config");

function checkActivation(apiKey, email) {
    return apiKey === config.APP_KEY && email === config.OWNER_EMAIL;
}
function validApiKey(apiKey, email) {
    // Ici, vous pouvez effectuer des opérations supplémentaires, telles que des requêtes API
    // Pour l'exemple, nous allons simplement retourner le résultat de la fonction checkActivation
    return checkActivation(apiKey, email);
}

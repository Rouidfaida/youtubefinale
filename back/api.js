const { getOptionsN, getSettingsN } = require("./controllers/loadmodule.controller");

// exports.getOption = async (req, name) => {
//     const options = await getOptionsN();
//     // console.log('Options dans getOption:', options);
//     return options[name] || false;
// };
exports.getOption = async (name) => {
    try {
        const options = await getOptionsN(); // Assurez-vous d'appeler la fonction getOptionsN correctement
        if (options && typeof options === 'object') {
            return options[name] || false; // Retourne la valeur de l'option si elle existe, sinon retourne false
        } else {
            throw new Error('Invalid options object');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'option:', error);
        throw error;
    }
};

exports.getSetting = async (name) => {
    try {
     const settings = await getSettingsN()
        if (settings && typeof settings === 'object') {
            return settings[name] || false; // Retourne la valeur de l'option si elle existe, sinon retourne false
        } else {
            throw new Error('Invalid settings object');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de setting', error);
        throw error;
    }
}

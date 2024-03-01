const express = require('express');
const { processRequest } = require('./controllers/loadmodule.controller');

const router = express.Router();



router.post('/visits/log', processRequest);



module.exports = router;

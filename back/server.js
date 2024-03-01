const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api2/visits', (req, res) => {
  const visitData = req.body;
  console.log('Données reçues :', visitData);
  // Traitez les données ici (ex. stockez-les dans une base de données)

  res.status(200).send('Données de visite reçues');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

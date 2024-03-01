
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4001;

app.use(bodyParser.json());

app.post('/api2/track-visit', (req, res) => {
  const visitData = req.body;
  console.log('Visit data received:', visitData);

  // Ici, vous pouvez traiter les données, les sauvegarder dans une base de données, etc.

  res.status(200).send({ message: 'Visit tracked successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

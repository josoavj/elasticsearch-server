const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

/**
 * Vérification de la connexion à Elasticsearch
 * Mode de connexion
 * > Via une authentification basique
 * > Plus le certificat de sécurité http.ca géneré automatiquement par elasticsearch
 */
const { Client, BaseConnection } = require("@elastic/elasticsearch");
const { ALL } = require("dns");
const client = new Client({
  node: "https://stagiaire:Police2405$@192.168.0.19:9200",
  tls: {
    ca: fs.readFileSync("./assets/http_ca.crt"),
    rejectUnauthorized: false,
  },
});
client.ping()
    .then(() => console.log('Connected to Elasticsearch'))
    .catch(err => console.error('Error connecting to Elasticsearch', err));
    module.exports = client;

// // Test d'accès aux données dans le serveur elasticsearch
// fetch("https://192.168.0.19:9200/filebeat-8.14.3/_search")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.error("Error:", error));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// searching on query
app.get('/search/:index/:type', async (req, res) => {
  const { phraseSearch } = require('./SearchEngine');
  const data = await phraseSearch(req.params.index, req.params.type, req.query.q);
  res.json(data);
});


// Test si le serveur est fonctionnel 
app.listen(3000, () => console.log('server running at 3000'));





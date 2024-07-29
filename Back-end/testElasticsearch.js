const fs = require("fs");

/**
 * Vérification de la connexion à Elasticsearch
 * Mode de connexion
 * > Via une authentification basique
 * > Plus le certificat de sécurité http.ca géneré automatiquement par
 * elasticsearch
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

client
  .ping()
  .then(() => console.log("Connected to Elasticsearch"))
  .catch((err) => console.error("Error connecting to Elasticsearch", err));
module.exports = client;

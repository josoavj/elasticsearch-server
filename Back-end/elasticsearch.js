const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
const http = require("https");
// Test de connexion direct via api
// const options = {
//   "method": "GET",
//   "hostname": "192.168.0.19",
//   "port": "9200",
//   "path": "/filebeat-8.14.3/_search",
// };

const { Client, BaseConnection } = require("@elastic/elasticsearch");
const { ALL } = require("dns");
const client = new Client({
  node: "https://stagiaire:Police2405$@192.168.0.19:9200",
  /**
   *  node: 'https://localhost:9200',
   * auth: {
   *     username: 'stagiaire',
   *     password: 'Police2405$'
   * }
   *
   */
  tls: {
    ca: fs.readFileSync("./assets/http_ca.crt"),
    rejectUnauthorized: false,
  },
});

// const req = http.request(options, function (res) {
//   const chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     const body = Buffer.concat(chunks);
//     console.log(body.toString());
//   });
// });

// req.end();

// Checking the elasticsearch client
async function checkClientInfo() {
  try {
    const info = await client.info();
    console.log("Client Info:", info);
  } catch (error) {
    console.error("Error checking the client info:", error);
  }
}

// Vérification des informations du cluster
async function checkClusterHealth() {
  try {
    const health = await client.cluster.health();
    console.log("Cluster Health:", health);
  } catch (error) {
    console.error("Error fetching cluster health:", error);
  }
}

// Checking the node health
async function checkNodeHealth() {
  try {
    const health = await client.nodes.stats();
    console.log("Node Health:", health);
  } catch (error) {
    console.error("Error fetching node health:", error);
  }
}

// Read data
async function readElasticIndex() {
  try {
    const index = await client.search({
      // index: '.ds-filebeat-8.14.3-2024.07.16-000001',
      index: "filebeat-8.14.3",

      body: { from: 0, size: 10, query: { match_all: {} } },
    });
    console.log("Données", index);
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

async function getLastFiveDocuments(index) {
  try {
    const { body } = await client.search({
      index: index,
      body: {
        query: { match_all: {} },
        sort: [{ _id: { order: "desc" } }],
        size: 5,
      },
    });

    const hits = body.hits.hits;
    hits.forEach((hit, index) => {
      console.log(`Document ${index + 1}:`, hit._source);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
  }
}

// Express Server
app.get("/", (req, res) => {
  console.log("The server is running");
});

app.listen(port, () => {
  console.log(`The app's listening on port ${port}`);
});

// Main basic checking functions
checkClusterHealth();
checkNodeHealth();
checkClientInfo();
readElasticIndex();
getLastFiveDocuments("filebeat-8.14.3");

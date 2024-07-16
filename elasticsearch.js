const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

const { Client, BaseConnection } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'https://stagiaire:Police2405$@192.168.0.19:9200',
  /**
   *  node: 'https://localhost:9200',
   * auth: {
   *     username: '',
   *     password: ''
   * }
   * 
  */
  tls: {
    ca: fs.readFileSync('./assets/http_ca.crt'),
    rejectUnauthorized: false,
  }
});

// Vérification des informations du cluster
async function checkClusterHealth() {
  try {
      const health = await client.cluster.health();
      console.log('Cluster Health:', health);
  } catch (error) {
      console.error('Error fetching cluster health:', error);
  }
}

// Checking the node health
async function checkNodeHealth() {
  try {
    const health = await client.nodes.stats();
    console.log('Node Health:', health);
  } catch (error) {
    console.error('Error fetching node health:', error);
  }
}

// Express Server
app.get('/', (req, res) => {
  console.log('The server is running')
})

app.listen(port, () => {
  console.log(`The app's listening on port ${port}`)
})

// Main
checkClusterHealth();
checkNodeHealth();
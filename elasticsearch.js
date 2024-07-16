const fs = require('fs');
const { Client, BaseConnection } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'https://stagiaire:Police2405$@192.168.0.19:9200',
  ssl: {
    ca: fs.readFileSync('./assets/http_ca.crt'),
    rejectUnauthorized: false,
  }
});

//// Vérifier les informations du cluster
async function checkClusterHealth() {
  try {
      const health = await client.cluster.health();
      console.log('Cluster Health:', health);
  } catch (error) {
      console.error('Error fetching cluster health:', error);
  }
}

// Effectuer une recherche dans l'index Filebeat
async function searchFilebeatIndex() {
  try {
    const result = await client.search({
      index: 'filebeat-8.14.1',
      body: {
        from: 0,
        size: 5,
        query: {
          match_all: {}
        }
      }
    });
    console.log('Search Results:', result.body.hits.hits);
  } catch (error) {
    console.error('Error searching index:', error);
  }
}

checkClusterHealth();
searchFilebeatIndex();
/*
  Express.js Server (Node Server)
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/*
  Elasticsearch client
*/
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: 'https://192.168.0.19:9200', 
    auth: {
      username: 'stagiaire', 
      password: 'Police2405$'
    }
  });
  client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))

  
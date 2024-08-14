const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { Client } = require("@elastic/elasticsearch");

const app = express();
const url = "https://172.27.28.14:9200/filebeat-8.15.0/_search";

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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const agent = new https.Agent({
  rejectUnauthorized: false,
  ca: fs.readFileSync("./assets/http_ca.crt"),
});

fetch(url, {
  method: "GET",
  // agent: agent,
  httpsAgent: agent,
  auth: { username: "stagiaire", password: "Police2405$" },
  tls: {
    ca: fs.readFileSync("./assets/http_ca.crt"),
    rejectUnauthorized: false,
  },
  headers: { Accept: "application/json", "Content-Type": "application/json" },
})
  .then((response) => response.json())
  .then((data) => console.log("GET response:", data))
  .catch((error) => console.error("GET error:", error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

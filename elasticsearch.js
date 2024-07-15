const { Client } = require('@elastic/elasticsearch')
const client = new Client({
 node: 'https://stagiaire:Police2405$@192.168.0.19:9200',
 tls: {
    ca: fs.readFileSync('/assets/http_ca.crt'),
    rejectUnauthorized: false
  }
})


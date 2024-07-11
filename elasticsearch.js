const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://192.168.0.19:9200',
  auth: {
    apiKey: 'VWNyTFdKQUJWU21VcHpJUHFaZUI6cDRDSVhvdjBRM08wMUxDamlVVGdKUQ=='
  },
  
  // const client = new Client({node: 'https://stagiaire:Police2405$@192.168.0.19:9200'})

  tls: {
    ca: fs.readFileSync('/path/to/ca.crt'),
    rejectUnauthorized: false
  }
})


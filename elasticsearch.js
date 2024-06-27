const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    apiKey: 'VWNyTFdKQUJWU21VcHpJUHFaZUI6cDRDSVhvdjBRM08wMUxDamlVVGdKUQ=='
  }
})


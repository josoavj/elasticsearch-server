class AjustedSyslog {
  constructor(object) {
    this.source = object._source.source;
    this.destination = object._source.destination;
    this.network = object._source.network;
    if (object._source.fortinet != undefined) {
      this.fortinet = object._source.fortinet.firewall;
    }
    if (object._source.rule != undefined) {
      this.rules = object._source.rule;
    }
    this.related = object._source.related;
  }
}

module.exports = AjustedSyslog;

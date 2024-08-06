class AjustedSyslog {
  constructor(object) {
    this.source = object._source.source;
    this.destination = object._source.destination;
    this.network = object._source.network;
    this.fortinet = object._source.fortinet.firewall;
    this.rules = object._source.rule;
  }
}

// export {AjustedSyslog}
// export default AjustedSyslog
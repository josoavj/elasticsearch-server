const SyslogDto = require('./syslogDto.js');
const AjustedSyslog = require('./ajustedSyslog.js');
class SyslogFilterService {

  constructor(syslog) { this.ajustedSyslog = new AjustedSyslog(syslog) }

  filterSyslog() {

    let syslogDto = new SyslogDto();
    // Sources
    syslogDto.ipSource = this.ajustedSyslog.source.ip;
    syslogDto.portSource = this.ajustedSyslog.source.port;
    syslogDto.bytesSource = this.ajustedSyslog.source.bytes;
    syslogDto.natIpSource = this.ajustedSyslog.source.nat.ip;

    // Destinations
    syslogDto.destinationOrgName =
        this.ajustedSyslog.destination.as.organization.name;
    syslogDto.portDestination = this.ajustedSyslog.destination.port;
    syslogDto.ipDestination = this.ajustedSyslog.destination.ip;
    syslogDto.bytesDestination = this.ajustedSyslog.destination.bytes;
    syslogDto.addressDestination = this.ajustedSyslog.destination.address;

    // Rules
    syslogDto.ruleName = this.ajustedSyslog.rules.name;

    // Fortinets Firewall
    syslogDto.fortinetFirewallDestinetsvc =
        this.ajustedSyslog.fortinet.dstinetsvc;
    syslogDto.fortinetFirewallvwlqualitySeqNum =
        this.extractSeqNum(this.ajustedSyslog.fortinet.vwlquality);
    syslogDto.fortinetFirewallvwlqualitySeqPort =
        this.extractSeqPort(this.ajustedSyslog.fortinet.vwlquality);

    // Networks
    syslogDto.bytesNetwork = this.ajustedSyslog.network.bytes;
    return syslogDto;
  }

  extractSeqNum(vwlquality) {
    vwlquality = vwlquality.replace("Seq_num(", '');
    vwlquality = vwlquality.replace(/(port\d+).*/, '$1');

    return vwlquality.split(' ')[0]
  }

  extractSeqPort(vwlquality) {
    vwlquality = vwlquality.replace("Seq_num(", '');
    vwlquality = vwlquality.replace(/(port\d+).*/, '$1');

    return vwlquality.split(' ')[1].replace("port", '')
  }
}

// SyslogFilterService();
// export default SyslogFilterService;

const SyslogDto = require("./syslogDto.js");
const AjustedSyslog = require("./ajustedSyslog.js");

class SyslogFilterService {
  constructor(syslog) {
    this.ajustedSyslog = new AjustedSyslog(syslog);
  }

  filterSyslog() {
    let syslogDto = new SyslogDto();
    // Sources
    syslogDto.ipSource = this.ajustedSyslog.source.ip;
    syslogDto.portSource = this.ajustedSyslog.source.port;
    syslogDto.bytesSource = this.ajustedSyslog.source.bytes;
    if (this.ajustedSyslog.source.nat.ip != undefined) {
      syslogDto.natIpSource = this.ajustedSyslog.source.nat.ip;
    }
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

    // syslogDto.fortinetFirewallDestinetsvc =
    // this.ajustedSyslog.fortinet.dstinetsvc;
    // syslogDto.fortinetFirewallvwlqualitySeqNum =
    // this.extractSeqNum(this.ajustedSyslog.fortinet.vwlquality);
    // syslogDto.fortinetFirewallvwlqualitySeqPort =
    // this.extractSeqPort(this.ajustedSyslog.fortinet.vwlquality);

    // Networks
    syslogDto.bytesNetwork = this.ajustedSyslog.network.bytes;

    // related
    syslogDto.relatedIps = this.extractRelatedIps(
      this.ajustedSyslog.related.ip,
    );
    syslogDto.relatedIpSource = syslogDto.relatedIps.ipSource;
    syslogDto.relatedIpDestination = syslogDto.relatedIps.ipDestination;
    if (syslogDto.relatedIps.ipSourcenat != undefined) {
      syslogDto.relatedIpSourcenat = syslogDto.relatedIps.ipSourcenat;
    }
    return syslogDto;
  }

  extractSeqNum(vwlquality) {
    vwlquality = vwlquality.replace("Seq_num(", "");
    vwlquality = vwlquality.replace(/(port\d+).*/, "$1");

    return vwlquality.split(" ")[0];
  }

  extractSeqPort(vwlquality) {
    vwlquality = vwlquality.replace("Seq_num(", "");
    vwlquality = vwlquality.replace(/(port\d+).*/, "$1");

    return vwlquality.split(" ")[1].replace("port", "");
  }

  extractRelatedIps(relatedIps) {
    let relatedIpsObject = new Object();
    if (relatedIps.length == 3) {
      relatedIpsObject.ipSource = relatedIps[0];
      relatedIpsObject.ipSourcenat = relatedIps[2];
      relatedIpsObject.ipDestination = relatedIps[1];
    } else if (relatedIps.length == 2) {
      relatedIpsObject.ipSource = relatedIps[0];
      relatedIpsObject.ipDestination = relatedIps[1];
    }
    return relatedIpsObject;
  }
}

module.exports = SyslogFilterService;

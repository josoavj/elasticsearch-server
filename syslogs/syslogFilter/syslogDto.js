class SyslogDto {
  ipSource = new String();
  portSource = new Int8Array();
  bytesSource = new Int16Array();
  natIpSource = new String();
  bytesNetwork = new Int16Array();
  ruleName = new String();
  ipDestination = new String();
  portDestination = new Int8Array();
  addressDestination = new String();
  bytesDestination = new Int16Array();
  destinationOrgName = new String();
  fortinetFirewallDestinetsvc = new String();
  fortinetFirewallvwlqualitySeqNum = new Int8Array();
  fortinetFirewallvwlqualitySeqPort = new Int8Array();
  relatedIp = new String();

  showDetails() {
    for (let key in this) {
      console.log(key + " : " + this[key])
    }
  }
}

// export {SyslogDto};
// export default SyslogDto;
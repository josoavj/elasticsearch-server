import AjustedSyslog from "./ajustedSyslog.js";
import {SyslogDto} from "./syslogDto.js"


class SyslogFilterService{
    
    constructor(syslog){
        this.ajustedSyslog = new AjustedSyslog(syslog)
    }

    filterSyslog(){

        let syslogDto = new SyslogDto();
        //sources
        syslogDto.ipSource = this.ajustedSyslog.source.ip;
        syslogDto.portSource = this.ajustedSyslog.source.port;
        syslogDto.bytesSource = this.ajustedSyslog.source.bytes;
        syslogDto.natIpSource = this.ajustedSyslog.source.nat.ip;
        
        //destinations
        syslogDto.destinationOrgName = this.ajustedSyslog.destination.as.organization.name;
        syslogDto.portDestination = this.ajustedSyslog.destination.port;
        syslogDto.ipDestination = this.ajustedSyslog.destination.ip;
        syslogDto.bytesDestination = this.ajustedSyslog.destination.bytes;
        syslogDto.addressDestination = this.ajustedSyslog.destination.address;

        //rules
        syslogDto.ruleName = this.ajustedSyslog.rules.name;

        //fortinets firewall
        syslogDto.fortinetFirewallDestinetsvc = this.ajustedSyslog.fortinet.dstinetsvc;
        syslogDto.fortinetFirewallvwlqualitySeqNum = this.extractSeqNum(this.ajustedSyslog.fortinet.vwlquality);
        syslogDto.fortinetFirewallvwlqualitySeqPort = this.extractSeqPort(this.ajustedSyslog.fortinet.vwlquality);
        
        //networks
        syslogDto.bytesNetwork = this.ajustedSyslog.network.bytes;
        return syslogDto;
    }

    extractSeqNum(vwlquality){
        vwlquality = vwlquality.replace("Seq_num(",'');
        vwlquality = vwlquality.replace(/(port\d+).*/, '$1');
    
        return vwlquality.split(' ')[0]
        
    }

    extractSeqPort(vwlquality){
        vwlquality = vwlquality.replace("Seq_num(",'');
        vwlquality = vwlquality.replace(/(port\d+).*/, '$1');
    
        return vwlquality.split(' ')[1].replace("port",'')

    }

}

export {SyslogFilterService}
export default SyslogFilterService;
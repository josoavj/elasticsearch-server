const { error } = require('console');
const SyslogFilterService = require('./syslogFilter/syslogFilterService');
const fs = require('fs');



fs.readFile(__dirname+'/syslog-content.json', 'utf8',(error, data)=>{
    if(error){
        console.log("error reading file",error);
        return
    }
    try{
        const syslogFromJson = JSON.parse(data);
        let syslogFilter = new SyslogFilterService(syslogFromJson);
        let syslogDto = syslogFilter.filterSyslog(); 

        syslogDto.showDetails();
    }catch (err) {
        console.error('Error reading or parsing the file:', err);
    }
});


//instaciena le SyslogFilterService io de ny param le object bedebe am syslog
//aveo atsona io syslogFilter io de manome anle SyslogDto io de le SyslogDto le efa vita filtre
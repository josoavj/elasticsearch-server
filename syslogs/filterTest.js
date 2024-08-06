const SyslogFilterService = require("./syslogFilter/syslogFilterService");
const fs = require("fs").promises;

async function readJsonFile() {
  try {
    //
    const data = await fs.readFile("syslog-content.json", "utf8");
    const jsonObject = JSON.parse(data);

    // jsonObject le am param io le object am syslog
    let syslogFilter = new SyslogFilterService(jsonObject);
    let syslogDto = syslogFilter.filterSyslog();

    syslogDto.showDetails();
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
  }
}

readJsonFile();

// instaciena le SyslogFilterService io de ny param le object bedebe am syslog
// aveo atsona io syslogFilter io de manome anle SyslogDto io de le SyslogDto le
// efa vita filtre

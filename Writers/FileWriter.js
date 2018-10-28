const fs = require('fs');
const BaseWriter = require('./BaseWriter');

class ConsoleWriter extends BaseWriter {
  write(lines) {
    const output = lines.join("\n");

    fs.writeFileSync(this.params.path, output);
  }
}

module.exports = ConsoleWriter;
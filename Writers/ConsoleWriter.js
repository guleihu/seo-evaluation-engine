const BaseWriter = require('./BaseWriter');

class ConsoleWriter extends BaseWriter {
  write(lines) {
    lines.forEach(line => {
      console.log(line);
    });
  }
}

module.exports = ConsoleWriter;
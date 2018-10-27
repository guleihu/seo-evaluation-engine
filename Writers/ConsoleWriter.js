const BaseWriter = require('./BaseWriter');

class ConsoleWriter extends BaseWriter {
  write(input) {
    console.log(input);
  }
}

module.exports = ConsoleWriter;
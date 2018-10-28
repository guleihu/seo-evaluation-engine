const BaseWriter = require('./BaseWriter');

class StreamWriter extends BaseWriter {
  write(lines) {
    const output = lines.join("\n");

    this.params.stream.write(output);
  }
}

module.exports = StreamWriter;
const fs = require('fs');
const BaseReader = require('./BaseReader');

class StreamReader extends BaseReader {
  read() {
    const stream = this.params.stream;

    if (!stream) {
      throw 'Missing parameter: stream';
    }

    let html = '';

    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => {
        html = html.concat(chunk);
      });

      stream.on('end', () => {
        this.html = html;

        resolve();
      });

      stream.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = StreamReader;
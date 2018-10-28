const fs = require('fs');
const BaseReader = require('./BaseReader');

class StreamReader extends BaseReader {
  read() {
    const path = this.params.path;

    if (!path) {
      throw 'Missing parameter: path';
    }

    let html = '';

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(path);

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
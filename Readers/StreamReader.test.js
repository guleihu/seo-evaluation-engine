const fs = require('fs');
const StreamReader = require('./StreamReader');

test('read', () => {
  const stream = fs.createReadStream(__dirname + '/StreamReader.test.html');

  const reader = new StreamReader({stream});

  return reader
    .read()
    .then(() => {
      const html = '<html><body></body></html>';

      expect(reader.html).toBe(html);
    });
});
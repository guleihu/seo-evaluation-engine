const StreamReader = require('./StreamReader');

test('read', () => {
  const reader = new StreamReader({
    path: __dirname + '/StreamReader.test.html',
  });

  return reader
    .read()
    .then(() => {
      const html = '<html><body></body></html>';

      expect(reader.html).toBe(html);
    });
});
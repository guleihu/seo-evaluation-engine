const FileReader = require('./FileReader');

test('read', () => {
  const reader = new FileReader({
    path: __dirname + '/FileReader.test.html',
  });

  reader.read();

  const html = '<html><body></body></html>';

  expect(reader.html).toBe(html);
});
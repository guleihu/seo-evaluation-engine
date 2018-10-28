const FileReader = require('./FileReader');

test('read', () => {
  const reader = new FileReader({
    path: __dirname + '/FileReader.test.html',
  });

  reader.read();

  expect(reader.html).toBe(reader.html);
});
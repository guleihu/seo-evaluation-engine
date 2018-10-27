const StringReader = require('./StringReader');

test('construct', () => {
  const html = '<html><body></body></html>';

  const reader = new StringReader({html});

  reader.read();

  expect(reader.html).toBe(html);
});
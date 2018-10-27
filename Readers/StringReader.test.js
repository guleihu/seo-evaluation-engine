const StringReader = require('./StringReader');

test('construct', () => {
  const html = '<html><body></body></html>';
  const reader = new StringReader();

  reader.read({html});

  expect(reader.html).toBe(html);
});
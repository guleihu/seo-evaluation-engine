const fs = require('fs');
const FileWriter = require('./FileWriter');

test('write', () => {
  const tmpPath = `/tmp/test-output-${Date.now()}.txt`;

  const writer = new FileWriter({
    path: tmpPath,
  });

  console.log(`Writing output to path: ${tmpPath}`);

  writer.write([
    '#1',
    '#2',
  ]);

  const output = fs.readFileSync(tmpPath, 'utf8');

  expect(output).toBe("#1\n#2");
});
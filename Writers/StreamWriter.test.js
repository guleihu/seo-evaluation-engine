const fs = require('fs');
const StreamWriter = require('./StreamWriter');

test('write', (done) => {
  const tmpPath = `/tmp/test-output-${Date.now()}.txt`;
  const stream = fs.createWriteStream(tmpPath);

  const writer = new StreamWriter({
    stream,
  });

  console.log(`Streaming output to path: ${tmpPath}`);

  writer.write([
    '#1',
    '#2',
  ]);

  stream.on('finish', () => {
    const output = fs.readFileSync(tmpPath, 'utf8');

    expect(output).toBe("#1\n#2");

    done();
  });

  setTimeout(() => {
    stream.end();
  }, 1000);
});
const {testFileOutput} = require('../helpers');
const FileWriter = require('./FileWriter');

test('write', () => {
  const writing = (tmpPath) => {
    const writer = new FileWriter({
      path: tmpPath,
    });

    console.log(`Writing output to path: ${tmpPath}`);

    writer.write([
      '#1',
      '#2',
    ]);
  };

  const testing = (output) => {
    expect(output).toBe("#1\n#2");
  };

  testFileOutput(writing, testing);
});
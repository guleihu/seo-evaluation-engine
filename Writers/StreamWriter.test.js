const {testStreamOutput} = require('../helpers');
const StreamWriter = require('./StreamWriter');

test('write', (done) => {
  const writing = (stream) => {
    const writer = new StreamWriter({
      stream,
    });

    writer.write([
      '#1',
      '#2',
    ]);
  };

  const testing = (output) => {
    expect(output).toBe("#1\n#2");

    done();
  };

  testStreamOutput(writing, testing);
});
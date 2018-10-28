const ConsoleWriter = require('./ConsoleWriter');
const {testConsoleLog} = require('../helpers');

test('write', () => {
  const writing = () => {
    const writer = new ConsoleWriter();

    writer.write([
      'TEST',
    ]);
  };

  const testing = (mockedConsoleLog, resultValues) => {
    expect(mockedConsoleLog.mock.calls.length).toBe(1);
    expect(resultValues[0]).toBe('TEST');
  };

  testConsoleLog(writing, testing);
});
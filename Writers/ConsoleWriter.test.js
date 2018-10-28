const ConsoleWriter = require('./ConsoleWriter');
const {testConsoleLog} = require('../helpers');

test('basic write', () => {
  const writer = new ConsoleWriter();

  testConsoleLog((mockedConsoleLog) => {
    writer.write([
      'TEST',
    ]);

    expect(mockedConsoleLog.mock.calls.length).toBe(1);
    expect(mockedConsoleLog.mock.results[0].value).toBe('TEST');
  });
});
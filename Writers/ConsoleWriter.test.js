const ConsoleWriter = require('./ConsoleWriter');
const {mockConsoleLog} = require('../helpers');

test('basic write', () => {
  const writer = new ConsoleWriter();

  mockConsoleLog((mockedConsoleLog) => {
    writer.write([
      'TEST',
    ]);

    expect(mockedConsoleLog.mock.calls.length).toBe(1);
    expect(mockedConsoleLog.mock.results[0].value).toBe('TEST');
  });
});
const ConsoleWrite = require('./ConsoleWriter');

test('basic write', () => {
  const writer = new ConsoleWrite();

  const consoleLog = console.log;

  const mockedConsoleLog = jest.fn(input => {
    return input;
  });

  console.log = mockedConsoleLog;

  writer.write('TEST');

  expect(mockedConsoleLog.mock.calls.length).toBe(1);
  expect(mockedConsoleLog.mock.results[0].value).toBe('TEST');

  console.log = consoleLog;
});
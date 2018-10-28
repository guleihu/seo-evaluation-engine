module.exports.mockConsoleLog = (callback) => {
  const consoleLog = console.log;
  const mockedConsoleLog = jest.fn(input => {
    return input;
  });

  console.log = mockedConsoleLog;

  callback(mockedConsoleLog);

  console.log = consoleLog;
};
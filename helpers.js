const fs = require('fs');

module.exports.mockConsoleLog = (callback) => {
  const consoleLog = console.log;
  const mockedConsoleLog = jest.fn(input => {
    return input;
  });

  console.log = mockedConsoleLog;

  callback(mockedConsoleLog);

  console.log = consoleLog;
};

module.exports.testFileOutput = (writing, testing) => {
  const tmpPath = `/tmp/test-output-${Date.now()}.txt`;

  writing(tmpPath);

  const output = fs.readFileSync(tmpPath, 'utf8');

  testing(output);
};
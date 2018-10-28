const fs = require('fs');

module.exports.testConsoleLog = (callback) => {
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

  console.log(`Writing output to path: ${tmpPath}`);

  writing(tmpPath);

  const output = fs.readFileSync(tmpPath, 'utf8');

  testing(output);
};

module.exports.testStreamOutput = (writing, testing, timeout = 500) => {
  const tmpPath = `/tmp/test-output-${Date.now()}.txt`;
  const stream = fs.createWriteStream(tmpPath);

  stream.on('finish', () => {
    const output = fs.readFileSync(tmpPath, 'utf8');

    testing(output);
  });

  console.log(`Streaming output to path: ${tmpPath}`);

  writing(stream);

  setTimeout(() => {
    stream.end();
  }, timeout);
};
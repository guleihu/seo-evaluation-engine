const {mockConsoleLog, testFileOutput, testStreamOutput} = require('./helpers');
const Engine = require('./Engine');
const StringReader = require('./Readers/StringReader');
const ConsoleWriter = require('./Writers/ConsoleWriter');
const FileWriter = require('./Writers/FileWriter');
const StreamWriter = require('./Writers/StreamWriter');
const DomHeadCheckRule = require('./Rules/DomHeadCheckRule');
const DomRedundantH1Rule = require('./Rules/DomRedundantH1Rule');

const testHtml = `
<html>
<head>
<!-- Missing <title/> -->
<meta name="description" content="DESC">
<meta name="keywords" content="KEYWORDS">
</head>
<body>
<!-- Redundant <h1/> -->
<h1>#1</h1>
<h1>#2</h1>
</body>
</html>
`;

const rules = [
  new DomHeadCheckRule(),
  new DomRedundantH1Rule(),
];

const expectedDefects = [
  'Missing <title/> in <head/>',
  'Redundant <h1/>',
];

test('string-in-console-out', () => {
  const engine = Engine.create({
    reader: new StringReader({html: testHtml}),
    writer: new ConsoleWriter(),
    rules,
  });

  mockConsoleLog((mockedConsoleLog) => {
    engine.evaluate();

    expect(mockedConsoleLog.mock.calls.length).toBe(2);

    const results = mockedConsoleLog.mock.results.map(item => {
      return item.value;
    });

    expect(results).toEqual(expect.arrayContaining(expectedDefects));
  })
});

test('string-in-file-out', () => {
  const writing = (tmpPath) => {
    const engine = Engine.create({
      reader: new StringReader({html: testHtml}),
      writer: new FileWriter({path: tmpPath}),
      rules,
    });

    engine.evaluate();
  };

  const testing = (output) => {
    const actualDefects = output.split("\n");

    expect(actualDefects).toEqual(expect.arrayContaining(expectedDefects));
  };

  testFileOutput(writing, testing);
});

test('string-in-stream-out', () => {
  const writing = (stream) => {
    const engine = Engine.create({
      reader: new StringReader({html: testHtml}),
      writer: new StreamWriter({stream}),
      rules,
    });

    engine.evaluate();
  };

  const testing = (output) => {
    const actualDefects = output.split("\n");

    expect(actualDefects).toEqual(expect.arrayContaining(expectedDefects));
  };

  testStreamOutput(writing, testing);
});
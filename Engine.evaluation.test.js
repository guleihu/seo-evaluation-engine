const {mockConsoleLog} = require('./helpers');
const Engine = require('./Engine');
const StringReader = require('./Readers/StringReader');
const ConsoleWriter = require('./Writers/ConsoleWriter');
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

const expectedDefects = [
  'Missing <title/> in <head/>',
  'Redundant <h1/>',
];

test('string-in-console-out', () => {
  const engine = Engine.create({
    reader: new StringReader({html: testHtml}),
    writer: new ConsoleWriter(),
    rules : [
      new DomHeadCheckRule(),
      new DomRedundantH1Rule(),
    ],
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

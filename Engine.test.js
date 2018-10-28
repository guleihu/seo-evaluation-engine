const Engine = require('./Engine');
const BaseReader = require('./Readers/BaseReader');
const BaseWriter = require('./Writers/BaseWriter');
const StringReader = require('./Readers/StringReader');
const ConsoleWriter = require('./Writers/ConsoleWriter');
const DomHeadCheckRule = require('./Rules/DomHeadCheckRule');
const DomRedundantH1Rule = require('./Rules/DomRedundantH1Rule');

class DummyReader extends BaseReader {
}

class DummyWriter extends BaseWriter {
}

class DummyEvaluator {
}

class DummyRule {
}

describe('configure', () => {
  test('set reader', () => {
    /* Check empty reader on new Engine */

    const engine = new Engine();
    expect(engine.reader).toBe(null);

    /* Check reader is set */

    const reader = new DummyReader();
    engine.reader = reader;
    expect(engine.reader).toBe(reader);
  });

  test('set writer', () => {
    /* Check empty writer on new Engine */

    const engine = new Engine();

    expect(engine.writer).toBe(null);

    /* Check writer is set */

    const writer = new DummyWriter();
    engine.writer = writer;

    expect(engine.writer).toBe(writer);
  });

  test('register evaluator', () => {
    /* Check empty evaluators on new Engine */

    const engine = new Engine();

    expect(engine.evaluators).toEqual({});

    /* Check evaluator is added */

    const evaluator = new DummyEvaluator();
    engine.registerEvaluator('test', evaluator);

    expect(engine.evaluators.test).toBe(evaluator);
  });

  test('add rule', () => {
    /* Check empty rules on new Engine */

    const engine = new Engine();

    expect(engine.rules).toEqual([]);

    /* Check rule is added */

    const rule = new DummyRule();

    engine.addRule(rule);

    expect(engine.rules[0]).toBe(rule);
  });
});

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

describe('evaluate', () => {
  test('string-in-console-out', () => {
    const engine = Engine({
      reader: new StringReader({html: testHtml}),
      writer: new ConsoleWriter(),
      rules : [
        new DomHeadCheckRule(),
        new DomRedundantH1Rule(),f
      ],
    });
  });
});
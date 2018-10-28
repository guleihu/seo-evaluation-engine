const {mockConsoleLog} = require('./helpers');
const Engine = require('./Engine');
const BaseReader = require('./Readers/BaseReader');
const BaseWriter = require('./Writers/BaseWriter');
const BaseEvaluator = require('./Evaluators/BaseEvaluator');
const BaseRule = require('./Rules/BaseRule');
const StringReader = require('./Readers/StringReader');
const ConsoleWriter = require('./Writers/ConsoleWriter');
const CheerioEvaluator = require('./Evaluators/CheerioEvaluator');
const DomHeadCheckRule = require('./Rules/DomHeadCheckRule');
const DomRedundantH1Rule = require('./Rules/DomRedundantH1Rule');

class DummyReader extends BaseReader {
}

class DummyWriter extends BaseWriter {
}

class DummyEvaluator extends BaseEvaluator {
}

class DummyRule extends BaseRule {
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

  test('construct', () => {
    const reader = new DummyReader();
    const writer = new DummyWriter();
    const evaluator = new DummyEvaluator();
    const rule = new DummyRule();

    const engine = new Engine({
      reader,
      writer,
      evaluators: {
        dummy: evaluator,
      },
      rules     : [
        rule,
      ],
    });

    expect(engine.reader).toBe(reader);
    expect(engine.writer).toBe(writer);
    expect(Object.keys(engine.evaluators).length).toBe(1);
    expect(engine.evaluators.dummy).toBe(evaluator);
    expect(engine.rules.length).toBe(1);
    expect(engine.rules[0]).toBe(rule);
  });

  test('create', () => {
    const reader = new DummyReader();
    const writer = new DummyWriter();
    const evaluator = new DummyEvaluator();
    const rule = new DummyRule();

    const engine = Engine.create({
      reader,
      writer,
      evaluators: {
        dummy: evaluator,
      },
      rules     : [
        rule,
      ],
    });

    expect(engine.reader).toBe(reader);
    expect(engine.writer).toBe(writer);
    expect(Object.keys(engine.evaluators).length).toBe(2);
    expect(engine.evaluators.cheerio instanceof CheerioEvaluator).toBe(true);
    expect(engine.evaluators.dummy).toBe(evaluator);
    expect(engine.rules.length).toBe(1);
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

describe.only('evaluate', () => {
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

      expect(results).toEqual(expect.arrayContaining([
        'Missing <title/> in <head/>',
        'Redundant <h1/>',
      ]));
    })
  });
});
const Engine = require('./Engine');
const BaseReader = require('./Readers/BaseReader');
const BaseWriter = require('./Writers/BaseWriter');
const BaseEvaluator = require('./Evaluators/BaseEvaluator');
const BaseRule = require('./Rules/BaseRule');
const CheerioEvaluator = require('./Evaluators/CheerioEvaluator');

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
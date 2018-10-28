# Extending Functionality

## Create a Reader

Take **FileReader** as example:

```javascript
const fs = require('fs');
const BaseReader = require('@guleihu/seo-evaluation-engine/Readers/BaseReader');

class FileReader extends BaseReader {
  read() {
    /* this.params is what being filled in to the constructor */
    const path = this.params.path;

    if (!path) {
      throw 'Missing parameter: path';
    }

    /* Put the string of HTML to this.html so it can be picked up later on */
    this.html = fs.readFileSync(path, 'utf8');
  }
}
```

## Create an Evaluator

Take **CheerioEvaluator** as example:

```javascript
const cheerio = require('cheerio');

const BaseEvaluator = require('@guleihu/seo-evaluation-engine/Evaluators/BaseEvaluator');

class CheerioEvaluator extends BaseEvaluator {
  /* Customizing constructor. Otherwise it will simply store params in place */
  constructor(params = {}) {
    super(params);

    this.cheerio = null;
  }

  /* Special cheerio instance to be used in Rules */
  get $() {
    return this.cheerio;
  }

  /* Evaluators will be booted right before Rules evaluating anything */
  boot({html}) {
    this.cheerio = cheerio.load(html);
  }

  /* Possible to create any useful methods to the class */
  countTagsMissingAttr(tag, attr) {
    let count = 0;

    this.$(tag).each((i, tagEl) => {
      const attrText = this.$(tagEl).attr(attr);

      if (typeof attrText !== 'string') {
        count++;
      } else if (attrText.trim().length < 1) {
        count++;
      }
    });

    return count;
  }
}
```

## Create a Rule

Take **DomImgMissingAltRule** as example:

```javascript
const BaseRule = require('@guleihu/seo-evaluation-engine/Rules/BaseRule');

class DomImgMissingAltRule extends BaseRule {
  evaluate({evaluators}) {
    /* The name of evaluators.* is determined by the key provided in Engine.registerEvaluator(key, evaluator) */    
    const count = evaluators.cheerio.countTagsMissingAttr('img', 'alt');

    if (count < 1) {
      return [];
    }

    /* Return any defect as string in an array */
    return [
      `Count of <img/> missing alt: ${count}`,
    ];
  }
}
```

## Create a Writer

Take **ConsoleWriter** as example:

```javascript
const BaseWriter = require('@guleihu/seo-evaluation-engine/Writers/BaseWriter');

class ConsoleWriter extends BaseWriter {
  write(lines) {
    /* Anything needed to be done for output. Return a promise if async operations involved */
    lines.forEach(line => {
      console.log(line);
    });
  }
}
```
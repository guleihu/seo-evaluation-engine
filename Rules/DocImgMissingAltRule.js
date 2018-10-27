class DocImgMissingAltRule {
  validate({evaluators}) {
    const $ = evaluators.cheerio;

    let count = 0;

    $('img').each((i, image) => {
      const alt = $(image).attr('alt');

      if (alt.trim().length < 1) {
        count++;
      }
    });

    if (count < 1) {
      return [];
    }

    return [
      `Count of <img/> missing alt: ${count}`,
    ];
  }
}

module.exports = DocImgMissingAltRule;
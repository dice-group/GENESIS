// npm packages
const request = require('request-promise-native');

// our packages
const {sessaEndpoint} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');
const enrichFromDBpedia = require('./dbpedia.enrich');

module.exports = async query => {
  // get results from SESSA
  const body = await timeout(
    5000,
    request.post({
      url: sessaEndpoint,
      json: true,
      form: {query, lang: 'en'},
    })
  );
  const firstQuestion = body.questions.pop();
  const firstAnswers = firstQuestion.answers.pop();
  const res = jsonRdfParser(firstAnswers);
  const resources = res.map(it => ({
    url: it.resource.value,
  }));

  console.log(resources);

  // fill results data from DBpedia
  const results = await enrichFromDBpedia({json: resources, getTitles: true});

  return results;
};

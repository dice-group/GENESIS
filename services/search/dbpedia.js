// npm packages
const _ = require('lodash/fp');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const {luceneService} = require('../../config');
const enrichFromDBpedia = require('./dbpedia.enrich');

// setup fetchival
fetchival.fetch = fetch;

// capitalize util
const capitalize = _.compose(
  _.join(' '),
  _.map(_.capitalize),
  _.words
);

module.exports = async q => {
  const origJson = await fetchival(luceneService).get({q});
  const json = origJson
    .map(it => ({
      url: it.url,
      title: capitalize(it.label),
    }))
    .slice(0, 30);

  const resultJson = await enrichFromDBpedia({json});
  return resultJson;
};

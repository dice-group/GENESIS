// npm packages
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const {costfedEndpoint} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

// setup fetchival
fetchival.fetch = fetch;

const params = {
  action: 'exec',
  queryLn: 'SPARQL',
  limit_query: '20',
  infer: true,
  Accept: 'application/sparql-results+json',
};

const generateQuery = q => `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT DISTINCT ?url ?label WHERE {
    ?url rdfs:label ?label .
    FILTER(langMatches(lang(?label), "EN"))
    FILTER regex(?label, "${q}", "i") .
} LIMIT 10`;

module.exports = async query => {
  // get results from SESSA
  const body = await timeout(
    5000,
    fetchival(costfedEndpoint).get({
      ...params,
      query: generateQuery(query),
    })
  );
  const data = await jsonRdfParser(body);
  const results = data.map(it => ({
    label: it.label.value,
    description: '',
    image: 'http://placehold.it/350x150',
  }));

  return results;
};

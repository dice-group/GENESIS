// npm packages
const request = require('request-promise-native');

// our packages
const {dataAdminChEndpoint} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

const generateQuery = q => `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT DISTINCT ?url ?label WHERE {
    ?url rdfs:label ?label .
    FILTER(langMatches(lang(?label), "EN"))
    FILTER regex(?label, "${q}", "i") .
} LIMIT 10`;

module.exports = async q => {
  // generate request form
  const query = generateQuery(q);
  // send request
  const body = await timeout(
    5000,
    request.post({
      url: dataAdminChEndpoint,
      headers: {
        Accept: 'application/sparql-results+json',
      },
      json: true,
      form: {query},
    })
  );
  const data = await jsonRdfParser(body);
  return data.map(it => ({
    title: it.label.value,
    url: it.url.value,
    description: 'No description available',
    image: 'http://placehold.it/350x150',
    source: 'Linked Data Pilot',
  }));
};

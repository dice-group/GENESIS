// npm packages
const request = require('request-promise-native');

// our packages
const {nifExportEndpoint} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

const generateQuery = q => `PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>
PREFIX itsrdf: <http://www.w3.org/2005/11/its/rdf#>
SELECT DISTINCT ?url ?label WHERE {
  GRAPH <http://dataset/> {
    ?s nif:anchorOf ?label .
    ?s itsrdf:taIdentRef ?url .
    FILTER regex(?url, "^http://www.wikidata.org", "i") .
  }
} LIMIT 10`;

module.exports = async q => {
  // generate request form
  const query = generateQuery(q);
  // send request
  const body = await timeout(
    30000,
    request.post({
      url: nifExportEndpoint,
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
    source: 'NIF Export TTL',
  }));
};

module.exports('Peter Fürst').then(res => {
  console.log(res);
});

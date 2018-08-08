// npm packages
const _ = require('lodash/fp');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const {sparqlEndpoint, defaultGraphUri} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

// setup fetchival
fetchival.fetch = fetch;

const jsonToQuery = ({json, getTitles}) => `select distinct ?url ?description ${getTitles && '?label'} ?image where {
  ?url <http://dbpedia.org/ontology/abstract> ?description .
  ${getTitles && '?url <http://www.w3.org/2000/01/rdf-schema#label> ?label .'}
  OPTIONAL {
      ?url <http://dbpedia.org/ontology/thumbnail> ?image .
  }
  FILTER(langMatches(lang(?description), "EN"))
  ${getTitles && 'FILTER(langMatches(lang(?label), "EN"))'}
  FILTER(?url IN (${json.map(it => `<${it.url}>`).join(',')}))
} LIMIT ${json.length * 2}`;

module.exports = async ({json, getTitles, source = 'DBpedia'}) => {
  const query = jsonToQuery({json, getTitles});
  const body = await timeout(
    30000,
    fetchival(sparqlEndpoint).get({
      'default-graph-uri': defaultGraphUri,
      query,
    })
  );
  const data = await jsonRdfParser(body);
  const resultJson = json
    .map(j => {
      const ex = data.filter(d => d.url.value === j.url)[0];
      if (!ex) {
        return undefined;
      }
      return {
        ...j,
        ...(getTitles ? {title: ex.label.value} : {}),
        description: ex.description.value,
        image: ex.image ? ex.image.value : 'http://placehold.it/350x150',
        source,
      };
    })
    // filter empty
    .filter(x => x !== undefined);

  return resultJson;
};

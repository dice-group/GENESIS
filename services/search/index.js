// npm packages
const _ = require('lodash/fp');
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {sparqlEndpoint, defaultGraphUri, luceneService} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

// setup fetchival
fetchival.fetch = fetch;

// capitalize util
const capitalize = _.compose(
  _.join(' '),
  _.map(_.capitalize),
  _.words
);

// logger
const logger = createLogger('GENESIS-search');

// init app
const app = fastify();

const jsonToQuery = json => `select distinct ?url ?description ?image where {
    ?url <http://dbpedia.org/ontology/abstract> ?description .
    OPTIONAL {
        ?url <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?description), "EN"))
    FILTER(?url IN (${json.map(it => `<${it.url}>`).join(',')}))
} LIMIT ${json.length * 2}`;

// serve index page
app.post('/', async (req, res) => {
  const {q} = req.body;
  logger.info('processing:', q, req.body, req.query);
  if (q.length < 2) {
    res.send([]);
    return;
  }

  const origJson = await fetchival(luceneService).get({q});
  const json = origJson
    .map(it => ({
      url: it.url,
      title: capitalize(it.label),
    }))
    .slice(0, 30);

  const body = await timeout(
    5000,
    fetchival(sparqlEndpoint).get({
      'default-graph-uri': defaultGraphUri,
      query: jsonToQuery(json),
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
        description: ex.description.value,
        image: ex.image ? ex.image.value : 'http://placehold.it/350x150',
      };
    })
    // filter empty
    .filter(x => x !== undefined);
  res.send(resultJson);
});

// start server
app.listen(8081, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-search listening at ${address}`);
});

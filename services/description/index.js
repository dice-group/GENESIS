// npm packages
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');
// logging
const createLogger = require('../../server/logger');

// our packages
const {sparqlEndpoint, defaultGraphUri} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');

// setup fetchival
fetchival.fetch = fetch;

// create logger
const logger = createLogger('GENESIS-description');

// init app
const app = fastify();

const urlToQuery = url => `select ?description ?image where {
    <${url}> <http://dbpedia.org/ontology/abstract> ?description .
    OPTIONAL {
        <${url}> <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?description), "EN"))
} LIMIT 1`;

// serve index page
app.post('/', async (req, res) => {
  const {url} = req.body;
  if (url.length < 2) {
    res.send([]);
    return;
  }

  logger.debug('generating description for:', url);

  const result = await fetchival(sparqlEndpoint).get({
    'default-graph-uri': defaultGraphUri,
    query: urlToQuery(url),
  });
  const body = await jsonRdfParser(result);
  const description = body
    .map(it => ({
      description: it.description.value.replace(/\s\s+/g, ' '),
      image: it.image ? it.image.value : undefined,
    }))
    .pop();
  res.send({description});
});

// start server
app.listen(8082, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-description listening at ${address}`);
});

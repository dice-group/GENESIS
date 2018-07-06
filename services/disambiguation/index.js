// npm packages
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {sparqlEndpoint, defaultGraphUri} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');

// setup fetchival
fetchival.fetch = fetch;

// logger
const logger = createLogger('GENESIS-disambiguation');

// init app
const app = fastify();

const urlToQuery = url => `select distinct ?subject where {
    <${url}> <http://purl.org/dc/terms/subject> ?s .
    ?s <http://www.w3.org/2000/01/rdf-schema#label> ?subject .
    FILTER(langMatches(lang(?subject), "EN"))
} LIMIT 5`;

// serve index page
app.post('/', async (req, res) => {
  const {url} = req.body;
  if (url.length < 2) {
    res.send([]);
    return;
  }

  logger.debug('generating disambiguation for:', url);

  const result = await fetchival(sparqlEndpoint).get({
    'default-graph-uri': defaultGraphUri,
    query: urlToQuery(url),
  });
  const body = await jsonRdfParser(result);
  const disambiguation = body.map(it => it.subject.value);
  res.send({disambiguation});
});

// start server
app.listen(8083, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-disambiguation listening at ${address}`);
});

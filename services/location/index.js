// npm packages
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {sparqlEndpoint, defaultGraphUri} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');
const timeout = require('../../util/timeout');

// setup fetchival
fetchival.fetch = fetch;

// logger
const logger = createLogger('GENESIS-location');

// init app
const app = fastify();

const urlToQuery = url => `select ?location where {
    <${url}> <http://www.georss.org/georss/point> ?location .
} LIMIT 1`;

// serve index page
app.post('/', async (req, res) => {
  const {url} = req.body;
  if (url.length < 2) {
    res.send([]);
    return;
  }

  logger.debug('generating location for:', url);

  const body = await timeout(
    3000,
    fetchival(sparqlEndpoint).get({
      'default-graph-uri': defaultGraphUri,
      query: urlToQuery(url),
    })
  );
  const parsedBody = await jsonRdfParser(body);
  const location = parsedBody.map(it => it.location.value).pop();
  if (!location) {
    res.send({location: false});
    return;
  }
  const coords = location.split(' ');
  const parsedCoords = {
    lat: coords[0],
    lon: coords[1],
  };

  res.send({location: parsedCoords});
});

// start server
app.listen(8090, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-location listening at ${address}`);
});

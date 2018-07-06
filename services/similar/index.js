// npm packages
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {sparqlEndpoint, defaultGraphUri, similarService} = require('../../config');
const jsonRdfParser = require('../../util/rdf-json-parser');

// setup fetchival
fetchival.fetch = fetch;

// logger
const logger = createLogger('GENESIS-similarEntities');

const jsonToQuery = json => `select distinct ?url ?title ?image where {
    ?url <http://www.w3.org/2000/01/rdf-schema#label> ?title .
    OPTIONAL {
        ?url <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?title), "EN"))
    FILTER(?url IN (${json.map(it => `<${it.entity2}>`).join(',')}))
} LIMIT ${json.length * 2}`;

// init app
const app = fastify();

// serve index page
app.post('/', async (req, res) => {
  const {url} = req.body;
  if (url.length < 2) {
    res.send({similarEntities: []});
    return;
  }

  logger.debug('getting similarEntities for:', url);
  const json = await fetchival(similarService).get({url});
  const body = await fetchival(sparqlEndpoint).get({
    'default-graph-uri': defaultGraphUri,
    query: jsonToQuery(json),
  });

  const data = await jsonRdfParser(body);
  const similarEntities = json
    .map(j => {
      const ex = data.filter(d => d.url.value === j.entity2)[0];
      if (!ex) {
        return undefined;
      }
      return {
        url: j.entity2,
        title: ex.title.value,
        image: ex.image ? ex.image.value : 'http://placehold.it/150x50',
      };
    })
    // filter empty
    .filter(x => x !== undefined);

  res.send({similarEntities});
  // .catch(e => logger.error(e));
});

// start server
app.listen(8086, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-similarEntities listening at ${address}`);
});

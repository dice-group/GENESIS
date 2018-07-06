// npm packages
const _ = require('lodash/fp');
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {luceneService} = require('../../config');

// setup fetchival
fetchival.fetch = fetch;

// capitalize util
const capitalize = _.compose(
  _.join(' '),
  _.map(_.capitalize),
  _.words
);

// logger
const logger = createLogger('GENESIS-typeahead');

// init app
const app = fastify();

// serve index page
app.post('/', async (req, res) => {
  const q = encodeURIComponent(req.body.q || '');
  if (q.length < 2) {
    res.send([]);
    return;
  }

  const json = await fetchival(luceneService).get({q});
  const resJson = json
    .map(it => ({
      url: it.url,
      title: capitalize(it.label),
    }))
    .slice(0, 10);

  res.send(resJson);
  // .catch(e => logger.error(e));
});

// start server
app.listen(8088, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-typeahead listening at ${address}`);
});

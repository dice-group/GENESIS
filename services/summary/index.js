// npm packages
const fastify = require('fastify');
const fetchival = require('fetchival');
const fetch = require('node-fetch');

// our packages
const createLogger = require('../../server/logger');
const {avatarService} = require('../../config');
const timeout = require('../../util/timeout');

// setup fetchival
fetchival.fetch = fetch;

// logger
const logger = createLogger('GENESIS-summary');

// init app
const app = fastify();

// serve index page
app.post('/', (req, res) => {
  const {url} = req.body;
  if (!url || url.length < 2) {
    res.send({summary: ''});
    return;
  }

  logger.debug('generating summary for:', url);

  timeout(30000, fetchival(avatarService, {responseAs: 'text'}).get({url}))
    .then(summary => res.send({summary}))
    .catch(error => res.status(500).json({error}));
});

// start server
app.listen(8089, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-summary listening at ${address}`);
});

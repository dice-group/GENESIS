// npm packages
const fastify = require('fastify');

// our packages
const createLogger = require('../../server/logger');
const findInDBpedia = require('./dbpedia');
const findInDataAdminCh = require('./data.admin.ch');
const findInSessa = require('./sessa');

// logger
const logger = createLogger('GENESIS-search');

// init app
const app = fastify();

// serve index page
app.post('/', async (req, res) => {
  const {q} = req.body;
  logger.info('processing:', q, req.body, req.query);
  if (q.length < 2) {
    res.send([]);
    return;
  }

  const resultJsonDbpedia = await findInDBpedia(q);
  const resultJsonAdminCh = await findInDataAdminCh(q);
  const resultJsonSessa = await findInSessa(q);

  const resultJson = resultJsonAdminCh.concat(resultJsonSessa).concat(resultJsonDbpedia);

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

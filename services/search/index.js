// npm packages
const fastify = require('fastify');

// our packages
const createLogger = require('../../server/logger');
const findInDBpedia = require('./dbpedia');
const findInDataAdminCh = require('./data.admin.ch');
const findInSessa = require('./sessa');
const findInCostFed = require('./costfed');
const findInNifExport = require('./nifexport');

// logger
const logger = createLogger('GENESIS-search');

// init app
const app = fastify();

const handleError = tag => e => {
  logger.error(`Error processing request to ${tag}`, e);
  return [];
};

// serve index page
app.post('/', async (req, res) => {
  const {q} = req.body;
  logger.info('processing:', q, req.body, req.query);
  if (q.length < 2) {
    res.send([]);
    return;
  }

  const [
    resultJsonDbpedia,
    resultJsonAdminCh,
    resultJsonSessa,
    resultJsonCostFed,
    resultJsonNifExport,
  ] = await Promise.all([
    findInDBpedia(q).catch(handleError('dbpedia')),
    findInDataAdminCh(q).catch(handleError('data.admin.ch')),
    findInSessa(q).catch(handleError('sessa')),
    findInCostFed(q).catch(handleError('costfed')),
    findInNifExport(q).catch(handleError('nifexport')),
  ]);

  const resultJson = resultJsonAdminCh
    .concat(resultJsonSessa)
    .concat(resultJsonDbpedia)
    .concat(resultJsonCostFed)
    .concat(resultJsonNifExport);

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

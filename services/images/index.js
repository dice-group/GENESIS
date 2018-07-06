// express
const fastify = require('fastify');
const imageSearch = require('g-i-s');

// our packages
const createLogger = require('../../server/logger');

// logger
const logger = createLogger('GENESIS-images');

// init app
const app = fastify();

// serve index page
app.post('/', (req, res) => {
  const {q} = req.body;
  if (q.length < 2) {
    res.send({images: []});
    return;
  }

  logger.debug('getting images for:', q);

  imageSearch(q, (err, images) => {
    if (err) {
      throw err;
    }

    res.send({images});
  });
});

// start server
app.listen(8084, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-images listening at ${address}`);
});

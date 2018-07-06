// npm packages
const fastify = require('fastify');

// our packages
const createLogger = require('../../server/logger');
const youtubeSearch = require('./youtube');

// logger
const logger = createLogger('GENESIS-videos');

// init app
const app = fastify();

// serve index page
app.post('/', async (req, res) => {
  const {q} = req.body;
  if (q.length < 2) {
    res.send({videos: []});
    return;
  }

  logger.debug('getting videos for:', q);
  const videos = await youtubeSearch(q);
  res.send({videos});
});

// start server
app.listen(8085, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-videos listening at ${address}`);
});

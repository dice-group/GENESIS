// npm packages
const next = require('next');

// our packages
const createLogger = require('./server/logger');

// start services
require('./services');
// get server
const server = require('./server');

// init logger
const logger = createLogger('genesis');

// setup next.js
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

// run app
const run = async () => {
  await app.prepare();

  server.get('*', (req, res) => handle(req.req, res.res));

  server.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
      logger.error(err);
      return;
    }
    logger.info(`GENESIS listening at ${address}`);
  });
};

run();

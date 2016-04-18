import {join} from 'path';
// express
import express from 'express';
// logging
import morgan from 'morgan';
import createLogger from './logger';
// webpack for dev
import setupWebpack from './webpack';
// api
import setupAPI from './api';

// logger
const logger = createLogger('server');

// init app
const app = express();
// logging
app.use(morgan('combined', {stream: logger.stream}));
// error handling inside of express
app.use((err, req, res, next) => { // eslint-disable-line
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

// setup webpack
setupWebpack(app);

// setup API
setupAPI(app);

// serve static content
app.use(express.static(join(__dirname, '..', 'client')));
// serve index page
app.get('*', (_, res) => res.sendFile(join(__dirname, '..', 'client', 'index.html')));

// catch uncaught errors
process.on('uncaughtException', (err) => logger.error('Uncaught exception:', err}));

// start server
const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng listening at http://${host}:${port}`);
});

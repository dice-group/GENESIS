// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// http requests
import fetchival from 'fetchival';
import fetch from 'node-fetch';
fetchival.fetch = fetch;
// promise timeout
import timeout from '../../util/timeout';

// logger
const logger = createLogger('summary');

// init app
const app = express();
// parse request bodies (req.body)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// support _method (PUT in forms etc)
app.use(methodOverride());
// logging
app.use(morgan('combined', {stream: logger.stream}));
// error handling inside of express
app.use((err, req, res, next) => { // eslint-disable-line
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

// serve index page
app.post('/', (req, res, next) => {
    const url = req.body.url;
    if (url.length < 2) {
        res.send({summary: ''});
        return;
    }

    logger.debug('generating summary for:', url);

    timeout(3000, fetchival('http://localhost:8182', {responseAs: 'text'}).get({url}))
    .then(summary => res.send({summary}))
    .catch(error => res.status(500).json({error}));
});

// start server
const server = app.listen(8089, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-summary listening at http://${host}:${port}`);
});

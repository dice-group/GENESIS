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

// logger
const logger = createLogger('search');

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
app.post('/', (req, res) => {
    const q = encodeURIComponent(req.body.q || '');
    if (q.length < 2) {
        res.send([]);
        return;
    }

    fetchival('http://localhost:8181/search')
    .get({q})
    .then(json => json.map(it => ({
        url: it.uri,
        title: it.label,
    })))
    .then(json => res.send(json));
});

// start server
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`LDB-search listening at http://${host}:${port}`);
});

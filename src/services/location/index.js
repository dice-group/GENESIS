// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// config
import {sparqlEndpoint, defaultGraphUri} from '../../../config';
// http requests
import fetchival from 'fetchival';
import fetch from 'node-fetch';
fetchival.fetch = fetch;
// json-rdf parser
import jsonRdfParser from '../../util/rdf-json-parser';
// promise timeout
import timeout from '../../util/timeout';

// logger
const logger = createLogger('location');

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

const urlToQuery = (url) => `select ?location where {
    <${url}> <http://www.georss.org/georss/point> ?location .
} LIMIT 1`;

// serve index page
app.post('/', (req, res) => {
    const url = req.body.url;
    if (url.length < 2) {
        res.send([]);
        return;
    }

    logger.debug('generating location for:', url);

    timeout(3000, fetchival(sparqlEndpoint)
    .get({
        'default-graph-uri': defaultGraphUri,
        query: urlToQuery(url),
    }))
    .then(body => jsonRdfParser(body))
    .then(body => body.map(it => it.location.value).pop())
    .then(location => {
        const coords = location.split(' ');
        return {
            lat: coords[0],
            lon: coords[1],
        };
    })
    .then(location => res.send({location}))
    .catch(error => res.status(500).json({error}));
});

// start server
const server = app.listen(8090, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-location listening at http://${host}:${port}`);
});

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

// logger
const logger = createLogger('disambiguation');

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

const urlToQuery = (url) => `select distinct ?subject where {
    <${url}> <http://purl.org/dc/terms/subject> ?s .
    ?s <http://www.w3.org/2000/01/rdf-schema#label> ?subject .
    FILTER(langMatches(lang(?subject), "EN"))
} LIMIT 5`;

// serve index page
app.post('/', (req, res) => {
    const url = req.body.url;
    if (url.length < 2) {
        res.send([]);
        return;
    }

    logger.debug('generating disambiguation for:', url);

    fetchival(sparqlEndpoint)
    .get({
        'default-graph-uri': defaultGraphUri,
        query: urlToQuery(url),
    })
    .then(body => jsonRdfParser(body))
    .then(body => body.map(it => it.subject.value))
    .then(disambiguation => res.send({disambiguation}));
});

// start server
const server = app.listen(8083, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-disambiguation listening at http://${host}:${port}`);
});

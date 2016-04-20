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
const logger = createLogger('description');

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

const urlToQuery = (url) => `select ?description ?image where {
    <${url}> <http://dbpedia.org/ontology/abstract> ?description .
    OPTIONAL {
        <${url}> <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?description), "EN"))
} LIMIT 1`;

// serve index page
app.post('/', (req, res) => {
    const url = req.body.url;
    if (url.length < 2) {
        res.send([]);
        return;
    }

    logger.debug('generating description for:', url);

    fetchival(sparqlEndpoint)
    .get({
        'default-graph-uri': defaultGraphUri,
        query: urlToQuery(url),
    })
    .then(body => jsonRdfParser(body))
    .then(body => body.map(it => ({
        description: it.description.value,
        image: it.image ? it.image.value : undefined,
    })).pop())
    .then(description => res.send({description}));
});

// start server
const server = app.listen(8082, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-description listening at http://${host}:${port}`);
});

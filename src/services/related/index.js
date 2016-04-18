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
const logger = createLogger('relatedEntities');

const jsonToQuery = (json) => `select distinct ?url ?title ?image where {
    ?url <http://www.w3.org/2000/01/rdf-schema#label> ?title .
    OPTIONAL {
        ?url <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?title), "EN"))
    FILTER(?url IN (${json.map(it => `<${it}>`).join(',')}))
} LIMIT ${json.length * 2}`;

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
    const {url} = req.body;
    if (url.length < 2) {
        res.send({relatedEntities: []});
        return;
    }

    logger.debug('getting relatedEntities for:', url);
    fetchival('http://localhost:8183/related')
    .get({url})
    .then(json => fetchival(sparqlEndpoint)
        .get({
            'default-graph-uri': defaultGraphUri,
            query: jsonToQuery(json),
        })
        .then(body => jsonRdfParser(body))
        .then(data => json.map(j => {
            const ex = data.filter(d => d.url.value === j)[0];
            if (!ex) {
                return undefined;
            }
            return {
                url: j,
                title: ex.title.value,
                image: ex.image ? ex.image.value : 'http://placehold.it/150x50',
            };
        })
        // filter empty
        .filter(x => x !== undefined))
    )
    .then(relatedEntities => res.send({relatedEntities}))
    .catch(e => logger.error(e));
});

// start server
const server = app.listen(8087, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-relatedEntities listening at http://${host}:${port}`);
});

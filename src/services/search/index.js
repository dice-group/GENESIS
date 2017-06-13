// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// config
import {sparqlEndpoint, defaultGraphUri, luceneService} from '../../../config';
// http requests
import fetchival from 'fetchival';
import fetch from 'node-fetch';
fetchival.fetch = fetch;
// json-rdf parser
import jsonRdfParser from '../../util/rdf-json-parser';
// promise timeout
import timeout from '../../util/timeout';
// lodash
import _ from 'lodash/fp';
const capitalize = _.compose(_.join(' '), _.map(_.capitalize), _.words);

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

const jsonToQuery = (json) => `select distinct ?url ?description ?image where {
    ?url <http://dbpedia.org/ontology/abstract> ?description .
    OPTIONAL {
        ?url <http://dbpedia.org/ontology/thumbnail> ?image .
    }
    FILTER(langMatches(lang(?description), "EN"))
    FILTER(?url IN (${json.map(it => `<${it.url}>`).join(',')}))
} LIMIT ${json.length * 2}`;

// serve index page
app.post('/', (req, res) => {
    const q = encodeURIComponent(req.body.q || '');
    if (q.length < 2) {
        res.send([]);
        return;
    }

    fetchival(luceneService)
    .get({q})
    .then(json => json.map(it => ({
        url: it.url,
        title: capitalize(it.label),
    })).slice(0, 30))
    .then(json => timeout(5000, fetchival(sparqlEndpoint)
        .get({
            'default-graph-uri': defaultGraphUri,
            query: jsonToQuery(json),
        }))
        .then(body => jsonRdfParser(body))
        .then(data => json.map(j => {
            const ex = data.filter(d => d.url.value === j.url)[0];
            if (!ex) {
                return undefined;
            }
            return {
                ...j,
                description: ex.description.value,
                image: ex.image ? ex.image.value : 'http://placehold.it/350x150',
            };
        })
        // filter empty
        .filter(x => x !== undefined))
    )
    .then(json => res.send(json))
    .catch(error => res.status(500).json({error}));
});

// start server
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-search listening at http://${host}:${port}`);
});

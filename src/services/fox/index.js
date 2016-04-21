// express
import express from 'express';
// lodash
import _ from 'lodash';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// http requests
import request from 'request';

// logger
const logger = createLogger('fox');
// endpoint url
const foxEndpoint = 'http://fox-demo.aksw.org/call/ner/entities';

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
    const input = req.body.input || '';
    if (input.length < 2) {
        res.send({annotations: [], error: 'no input'});
        return;
    }

    logger.debug('generating FOX annotations for:', input);

    request({
        method: 'POST',
        url: foxEndpoint,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input,
            type: 'text',
            task: 'ner',
            output: 'JSON-LD',
        }),
    }, (err, foxres, body) => {
        // handle error
        if (err) {
            next(err);
            return;
        }

        // check if the status code is OK
        if (foxres && foxres.statusCode !== 200) {
            next(new Error(`Error code: ${foxres.statusCode}, ${foxres.statusMessage}`));
            return;
        }

        // parse results
        const result = JSON.parse(body);
        const entries = result['@graph'] ? result['@graph'] : [];
        const annotations = entries.map(it => ({
            types: it['@type'] ? it['@type']
                .map(t => (t.indexOf(':') !== -1 ? t.split(':')[1] : t))
                .map(t => t.toLowerCase())
                .map(_.capitalize)
                .filter(t => t !== 'Annotation') : [],
            means: it.means,
            name: it['ann:body'],
            beginIndex: typeof it.beginIndex === 'string' ? [it.beginIndex] : it.beginIndex,
            endIndex: typeof it.endIndex === 'string' ? [it.endIndex] : it.endIndex,
        }));

        res.send({annotations});
    });
});

// start server
const server = app.listen(8091, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-fox listening at http://${host}:${port}`);
});

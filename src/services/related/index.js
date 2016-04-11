// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// faker for fake data generation
// TODO: replace with real data
import faker from 'faker';

// logger
const logger = createLogger('relatedEntities');

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
    logger.debug('getting relatedEntities for:', url);
    res.send({
        relatedEntities: [
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url(),
            faker.internet.url(),
        ],
    });
});

// start server
const server = app.listen(8087, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-relatedEntities listening at http://${host}:${port}`);
});

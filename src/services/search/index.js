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
    const q = req.body.q || '';
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            image: faker.image.imageUrl(),
            url: faker.internet.url(),
        });
    }

    res.send(data.filter(s => s.title.toLowerCase().includes(q.toLowerCase())));
});

// start server
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`LDB-search listening at http://${host}:${port}`);
});

// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// use google image search api
import imageSearch from 'g-i-s';

// logger
const logger = createLogger('images');

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
    const {q} = req.body;
    if (q.length < 2) {
        res.send({images: []});
        return;
    }

    logger.debug('getting images for:', q);

    imageSearch(q, (err, images) => {
        if (err) {
            throw err;
        }

        res.send({images});
    });
});

// start server
const server = app.listen(8084, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Ginseng-images listening at http://${host}:${port}`);
});

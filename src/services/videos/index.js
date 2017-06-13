// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';
// youtube search
import youtubeSearch from './youtube';

// logger
const logger = createLogger('videos');

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
    const {q} = req.body;
    if (q.length < 2) {
        res.send({videos: []});
        return;
    }

    logger.debug('getting videos for:', q);
    youtubeSearch(q)
    .then(videos => res.send({videos}))
    .catch(next);
});

// start server
const server = app.listen(8085, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`LDB-videos listening at http://${host}:${port}`);
});

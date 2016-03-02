import {join} from 'path';
// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import logger from './logger';
// webpack for dev
import setupWebpack from './webpack';

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

// setup webpack
setupWebpack(app);

// serve static content
app.use(express.static(join(__dirname, '..', 'client')));
// serve index page
app.get('/', function response(req, res) {
    res.sendFile(join(__dirname, '..', 'client', 'index.html'));
});

// start server
const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`LinkedDataBrowser listening at http://${host}:${port}`);
});

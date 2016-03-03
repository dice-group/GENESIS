// express
import express from 'express';
// requests handling
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
// logging
import morgan from 'morgan';
import createLogger from '../../server/logger';

// logger
const logger = createLogger('typeahead');

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
    console.log(req, q);
    const data = [
        'test',
        'other',
        'resource 1',
        'Something else',
        'Timetravel',
        'Outter space',
        'Rolling star',
    ];

    res.send(data.filter(s => s.toLowerCase().includes(q.toLowerCase())));
});

// start server
const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`LDB-typeahead listening at http://${host}:${port}`);
});

// npm packages
const fastify = require('fastify');
const request = require('request');

// our packages
const createLogger = require('../../server/logger');

// logger
const logger = createLogger('GENESIS-fox');
// endpoint url
const foxEndpoint = 'http://fox-demo.aksw.org/fox';

// init app
const app = fastify();

// serve index page
app.post('/', (req, res) => {
  const input = req.body.input || '';
  if (input.length < 2) {
    res.send({annotations: [], error: 'no input'});
    return;
  }

  logger.debug('generating FOX annotations for:', input);

  request(
    {
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
        nif: 0,
        lang: 'en',
        defaults: 0,
        foxlight: 'OFF',
      }),
    },
    (err, foxres, body) => {
      // handle error
      if (err) {
        res.code(400).send(err);
        return;
      }

      // check if the status code is OK
      if (foxres && foxres.statusCode !== 200) {
        res.code(400).send(new Error(`Error code: ${foxres.statusCode}, ${foxres.statusMessage}`));
        return;
      }

      // parse results
      const result = JSON.parse(body);
      const entries = result['@graph'] ? result['@graph'] : [];
      const annotations = entries.filter(it => it.taClassRef).map(it => ({
        types: it.taClassRef.filter(type => type.startsWith('foxo:')).map(type => type.replace('foxo:', '')),
        url: it.taIdentRef,
        name: it.anchorOf,
        beginIndex: it.beginIndex,
        endIndex: it.endIndex,
      }));

      res.send({annotations});
    }
  );
});

// start server
app.listen(8091, (err, address) => {
  if (err) {
    logger.error(err);
    return;
  }
  logger.info(`GENESIS-fox listening at ${address}`);
});

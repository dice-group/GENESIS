import httpProxy from 'http-proxy';

const searchProxy = httpProxy.createProxyServer({target: 'http://localhost:8081', ignorePath: true});
const descriptionProxy = httpProxy.createProxyServer({target: 'http://localhost:8082', ignorePath: true});
const disambiguationProxy = httpProxy.createProxyServer({target: 'http://localhost:8083', ignorePath: true});
const imagesProxy = httpProxy.createProxyServer({target: 'http://localhost:8084', ignorePath: true});
const videosProxy = httpProxy.createProxyServer({target: 'http://localhost:8085', ignorePath: true});
const similarProxy = httpProxy.createProxyServer({target: 'http://localhost:8086', ignorePath: true});
const relatedProxy = httpProxy.createProxyServer({target: 'http://localhost:8087', ignorePath: true});
const typeaheadProxy = httpProxy.createProxyServer({target: 'http://localhost:8088', ignorePath: true});
const summaryProxy = httpProxy.createProxyServer({target: 'http://localhost:8089', ignorePath: true});
const locationProxy = httpProxy.createProxyServer({target: 'http://localhost:8090', ignorePath: true});

export default (app) => {
    app.post('/api/search', (req, res) => searchProxy.web(req, res));
    app.post('/api/description', (req, res) => descriptionProxy.web(req, res));
    app.post('/api/disambiguation', (req, res) => disambiguationProxy.web(req, res));
    app.post('/api/images', (req, res) => imagesProxy.web(req, res));
    app.post('/api/videos', (req, res) => videosProxy.web(req, res));
    app.post('/api/similar', (req, res) => similarProxy.web(req, res));
    app.post('/api/related', (req, res) => relatedProxy.web(req, res));
    app.post('/api/typeahead', (req, res) => typeaheadProxy.web(req, res));
    app.post('/api/summary', (req, res) => summaryProxy.web(req, res));
    app.post('/api/location', (req, res) => locationProxy.web(req, res));
};

import httpProxy from 'http-proxy';

const searchProxy = httpProxy.createProxyServer({target: 'http://localhost:8081', ignorePath: true});
const descriptionProxy = httpProxy.createProxyServer({target: 'http://localhost:8082', ignorePath: true});
const disambiguationProxy = httpProxy.createProxyServer({target: 'http://localhost:8083', ignorePath: true});
const imagesProxy = httpProxy.createProxyServer({target: 'http://localhost:8084', ignorePath: true});

export default (app) => {
    app.post('/api/search', (req, res) => searchProxy.web(req, res));
    app.post('/api/description', (req, res) => descriptionProxy.web(req, res));
    app.post('/api/disambiguation', (req, res) => disambiguationProxy.web(req, res));
    app.post('/api/images', (req, res) => imagesProxy.web(req, res));
};

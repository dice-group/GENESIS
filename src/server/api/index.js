import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({target: 'http://localhost:8081', ignorePath: true});

export default (app) => {
    app.post('/api/typeahead', (req, res) => proxy.web(req, res));
};

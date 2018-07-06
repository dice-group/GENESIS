// npm packages
const fastify = require('fastify');
const proxy = require('fastify-http-proxy');

// init app
const app = fastify();

const services = [
  {
    upstream: 'http://localhost:8081',
    prefix: '/api/search',
  },
  {
    upstream: 'http://localhost:8082',
    prefix: '/api/description',
  },
  {
    upstream: 'http://localhost:8083',
    prefix: '/api/disambiguation',
  },
  {
    upstream: 'http://localhost:8084',
    prefix: '/api/images',
  },
  {
    upstream: 'http://localhost:8085',
    prefix: '/api/videos',
  },
  {
    upstream: 'http://localhost:8086',
    prefix: '/api/similar',
  },
  {
    upstream: 'http://localhost:8087',
    prefix: '/api/related',
  },
  {
    upstream: 'http://localhost:8088',
    prefix: '/api/typeahead',
  },
  {
    upstream: 'http://localhost:8089',
    prefix: '/api/summary',
  },
  {
    upstream: 'http://localhost:8090',
    prefix: '/api/location',
  },
  {
    upstream: 'http://localhost:8091',
    prefix: '/api/fox',
  },
];

services.forEach(svc => app.register(proxy, svc));

// return server
module.exports = app;

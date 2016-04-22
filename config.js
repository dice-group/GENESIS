export const sparqlEndpoint = process.env.SPARQL_ENDPOINT || 'http://dbpedia.org/sparql';
export const defaultGraphUri = process.env.DEFAULT_GRAPH_URI || 'http://dbpedia.org';
export const luceneService = process.env.LUCENE_SERVICE || 'http://localhost:8181/search';
export const avatarService = process.env.AVATAR_SERVICE || 'http://localhost:8182';
export const similarService = process.env.SIMILAR_SERVICE || 'http://localhost:8183/similar';
export const relatedService = process.env.RELATED_SERVICE || 'http://localhost:8183/related';

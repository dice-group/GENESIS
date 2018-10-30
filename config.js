exports.sparqlEndpoint = process.env.SPARQL_ENDPOINT || 'http://dbpedia.org/sparql';
exports.defaultGraphUri = process.env.DEFAULT_GRAPH_URI || 'http://dbpedia.org';
exports.luceneService = process.env.LUCENE_SERVICE || 'http://localhost:8181/search';
exports.avatarService = process.env.AVATAR_SERVICE || 'http://localhost:8182';
exports.similarService = process.env.SIMILAR_SERVICE || 'http://localhost:8183/similar';
exports.relatedService = process.env.RELATED_SERVICE || 'http://localhost:8183/related';
exports.dataAdminChEndpoint = process.env.DATA_ADMIN_CH_ENDPOINT || 'http://data.admin.ch/query';
exports.nifExportEndpoint = process.env.NIF_EXPORT_ENDPOINT || 'http://genesis-diesel-vos.aksw.org/sparql';
exports.sessaEndpoint = process.env.SESSA_ENDPOINT || 'http://sessa.aksw.org/gerbil';
exports.costfedEndpoint =
  process.env.COSTFED_ENDPOINT || 'http://costfed.aksw.org/rdf4j-workbench/repositories/CostFedDiesel/query';

require('babel-core/register');
// start main
require('./src/index');
// start services
require('./src/services/search');
require('./src/services/description');
require('./src/services/disambiguation');
require('./src/services/images');
require('./src/services/videos');
require('./src/services/similar');
require('./src/services/related');
require('./src/services/typeahead');
require('./src/services/summary');
require('./src/services/location');

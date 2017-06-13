import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../../webpack.config.js';
import createLogger from '../logger';
const logger = createLogger('webpack');

const isProduction = process.env.NODE_ENV === 'production';

// define node_env
config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)},
    }),
];
// if not prod - enable hot reload
if (!isProduction) {
    logger.info('not production - adding hot reload plugins');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
    // override entry for hotload
    config.entry = [
        'webpack-hot-middleware/client',
        config.entry,
    ];
} else {
    logger.info('production - adding optimization plugins');
    config.devtool = 'cheap-source-map';
    config.debug = false;
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
    }));
}

// returns a Compiler instance
const compiler = webpack(config);

// create express
export default (app) => {
    app.use(webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        },
    }));

    if (!isProduction) {
        logger.info('not production - running hot reload middleware');
        app.use(webpackHotMiddleware(compiler));
    }
};

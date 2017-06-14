const path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    debug: true,
    context: path.resolve(__dirname, 'src', 'client'),
    entry: path.join(__dirname, 'src', 'client', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'client', 'dist'),
        publicPath: '/dist/',
        filename: 'app.min.js',
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules'],
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        module: 'empty',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                ],
            },
            {
                test: /node_modules\/.+\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    env: {
                        development: {
                            presets: ['react-hmre'],
                        },
                    },
                },
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.woff\d?(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.ttf(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream',
            },
            {
                test: /\.eot(\?.+)?$/,
                loader: 'url?limit=10000',
            },
            {
                test: /\.svg(\?.+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml',
            },
            {
                test: /\.png$/,
                loader: 'url?limit=10000&mimetype=image/png',
            },
            {
                test: /\.gif$/,
                loader: 'url?limit=10000&mimetype=image/gif',
            },
        ],
    },
};

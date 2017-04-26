var path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        libraryTarget: "var",
        library: "webStores",
        filename: './app.bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                }
            }]
        },
            {
                test: /\.json$/,
                use: 'json-loader'
            }]
    },
    devtool: 'source-map',
    watch: true
};
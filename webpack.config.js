/**
 * @since 2015-12-14 09:42
 * @author vivaxy
 */
'use strict';

module.exports = {
    entry: {
        'demo/dest': './src/demo.js',
        'test/dest': './src/test.js'
    },
    output: {
        filename: './[name].js'
    },
    module: {
        loaders: [
            {
                test: /src\/.+\.js?$/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    }
};

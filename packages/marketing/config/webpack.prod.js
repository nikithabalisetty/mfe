const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');
const { plugins } = require('../../container/config/webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].json',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp':'./src/bootstrap'
            },
            shared: packageJson.dependencies,
        })
    ]
}


module.exports = merge(commonConfig, prodConfig)
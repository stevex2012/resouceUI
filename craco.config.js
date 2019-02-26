/* craco.config.js */
// https://github.com/sharegate/craco

const path = require('path');
const fs = require('fs');
const { paths, when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');

// https://github.com/webpack-contrib/stylelint-webpack-plugin#readme
const StyleLintPlugin = require('stylelint-webpack-plugin');
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');

// helpers
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    style: {
        // https://github.com/postcss/postcss
        postcss: {
            mode: 'extends' /* (default value) */ || 'file',
            plugins: [],
        },
    },
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: 'lodash',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                },
                'lodash',
            ],
            [
                'import',
                {
                    libraryName: '@alifd/next',
                    libraryDirectory: 'es',
                },
                '@alifd',
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
    },
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, `${paths.appSrc}/components/`),
        },
        plugins: [
            new StyleLintPlugin({
                syntax: 'scss',
                configBasedir: __dirname,
                context: path.resolve(__dirname, paths.appSrc),
                files: ['**/*.{scss,sass,css}'],
                fix: true,
            }),
        ],
    },
    plugins: [
        {
            plugin: reactHotReloadPlugin,
        },
    ],
};

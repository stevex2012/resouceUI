// https://github.com/pedronauck/docz
// https://www.docz.site/documentation/project-configuration
// https://github.com/pedronauck/docz/tree/master/packages/docz-theme-default

import { css } from '@fpapado/docz-plugin-css';
import doczPluginNetlify from 'docz-plugin-netlify';

import themeConfig from './docz/theme-config/config';
import customStyle from './docz/theme-config/style';
export default {
    title: 'toxic-UI',
    description: 'toxic-UI Lib, 轻量级 React UI 框架',
    src: './src',
    // files: '**/*.{md,markdown,mdx}',
    // dest: 'docz-dist',
    indexHtml: 'docz/index.html',
    wrapper: 'docz/wrapper',
    // theme: 'docz/theme/index.tsx',
    // codeSandbox: false,
    // hashRouter: true,
    // propsParser: false,
    // debug: true,
    port: 3003,
    themeConfig: themeConfig,
    htmlContext: {
        head: {
            links: [
                {
                    rel: 'stylesheet',
                    href: 'https://codemirror.net/theme/dracula.css',
                    //href: 'https://codemirror.net/theme/mdn-like.css',
                },
            ],
            // raw: customStyle,
        },
    },
    plugins: [
        // enable CSS Modules when using ".module.scss" file extension
        css({
            preprocessor: 'sass',
            cssmodules: true,
            ruleOpts: {
                test: /\.module\.scss$/,
                exclude: [/node_modules/],
            },
        }),
        // disable CSS Modules when using ".scss" file extension
        css({
            preprocessor: 'sass',
            cssmodules: false,
            ruleOpts: {
                test: /\.scss$/,
                exclude: [/node_modules/, /\.module\.scss$/],
            },
        }),
        css({
            preprocessor: 'postcss',
            // cssmodules: true,
        }),
        doczPluginNetlify(),
    ],
};

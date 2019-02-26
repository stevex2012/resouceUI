// Migrating from create-react-app without ejecting

// https://github.com/timarney/react-app-rewired/
// https://github.com/arackaf/customize-cra
// https://github.com/postcss/postcss
// https://github.com/cdharris/react-app-rewire-hot-loader
const fs = require('fs');
const path = require('path');
const paths = require('react-app-rewired/scripts/utils/paths');
const pkgJSON = require(`${__dirname}/package.json`);
const {
    override,
    addBabelPlugin,
    addBabelPlugins,
    addBundleVisualizer,
    addDecoratorsLegacy,
    addWebpackAlias,
    adjustWorkbox,
    addPostcssPlugins,
    disableEsLint,
    enableEslintTypescript,
    fixBabelImports,
    useEslintRc,
    useBabelRc,
} = require('customize-cra');

// theme变量覆盖
const applyTheme = () => (config, env) => {
    const rewireTheme = require('./rewire-theme');
    config = rewireTheme(config);

    return config;
};

// react-hot-loader
const hotLoader = () => (config, env) => {
    // https://www.npmjs.com/package/react-hot-loader
    const rewireReactHotLoader = require('react-app-rewire-hot-loader');
    config = rewireReactHotLoader(config, env);

    return config;
};

// stylelint-webpack-plugin
const stylelint = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // https://github.com/webpack-contrib/stylelint-webpack-plugin#readme
    const StyleLintPlugin = require('stylelint-webpack-plugin');
    config.plugins.push(
        new StyleLintPlugin({
            syntax: 'scss',
            configBasedir: __dirname,
            context: path.resolve(__dirname, '.'),
            files: ['**/*.{scss,sass,css}'],
            fix: true,
        })
    );

    return config;
};

// 编译结果消息弹出提示
const buildNotifier = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // https://github.com/RoccoC/webpack-build-notifier
    const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
    config.plugins.push(
        new WebpackBuildNotifierPlugin({
            suppressSuccess: false,
            suppressCompileStart: false,
            suppressWarning: false,
            activateTerminalOnError: true
        })
    );

    return config;
};

// 编译进度图形展示
const buildProgress = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // https://github.com/hyunchulkwak/webpack-simple-progress-plugin
    const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
    config.plugins.push(
        new SimpleProgressPlugin()
    );

    return config;
};

// 代码优化压缩:在react-scripts 2.1.5的基础上增加了去除console的功能
const minimizer = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }
    // Source maps are resource heavy and can cause out of memory issue for large source files.
    const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
    // https://github.com/webpack-contrib/terser-webpack-plugin
    const TerserPlugin = require('terser-webpack-plugin');
    const tMinimizer = config.optimization.minimizer;
    for (let i = 0; i < tMinimizer.length; i++) {
        if (tMinimizer[i] instanceof TerserPlugin) {
            config.optimization.minimizer[0] = new TerserPlugin({
                terserOptions: {
                    parse: {
                        // we want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minfication steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending futher investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: shouldUseSourceMap,
            });

            console.log('生产环境：支持自动去除console.');

            break;
        }
    }

    return config;
};

// 代码优化分割
const codeSplitOptimize = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }

    //从根目录获取
    paths.appVendors = path.join(paths.appSrc, 'vendorConfig.js');

    const extractVendors = () => {
        if (!fs.existsSync(paths.appVendors)) {
            return null;
        }
        const vendors = require(paths.appVendors);
        if (Array.isArray(vendors)) {
            if (vendors.length === 0) {
                return null;
            }
            if (Array.isArray(vendors[0])) {
                vendors.forEach((vendor) => {
                    if (!Array.isArray(vendor)) {
                        throw new Error('Wrong vendors');
                    }
                });
                // vendors are defined as: [['moduleA', 'moduleB'], ['moduleC', 'moduleD']]
                const outputVendors = {};
                vendors.forEach((vendor, index) => {
                    outputVendors[`vendor${index}`] = vendor;
                });
                return outputVendors;
            } else {
                vendors.forEach((vendor) => {
                    if (!(typeof vendor === 'string')) {
                        throw new Error('Wrong vendors');
                    }
                });
                // vendors are defined as: ['moduleA', 'moduleB']
                return { vendors };
            }
        } else if (typeof vendors === 'object') {
            // vendors are defined as: { vendorA: ['moduleA', 'moduleB'] }
            return vendors;
        } else {
            throw new Error('Wrong vendors');
        }
    };

    // 提取第三方库
    config.entry = { ...config.entry, ...(extractVendors() || {}) };

    const webpack = require('webpack');
    const hash = require('hash-sum');

    // 固化moduleIds
    config.optimization.moduleIds = 'hashed';

    // 固化chunkIds
    config.optimization.chunkIds = 'named';

    // 在使用路由懒加载的情况下，chunkIds='named'方式无效，手动修复
    const seen = new Set();

    function hashModule(modules, hashLength = 4) {
        const joinedHash = hash(modules.map((m) => m.id).join('_'));

        let len = hashLength;
        while (seen.has(joinedHash.substr(0, len))) {
            len++;
        }
        seen.add(joinedHash.substr(0, len));
        return joinedHash.substr(0, len);
    }

    config.plugins.push(
        new webpack.NamedChunksPlugin((chunk) => {
            if (chunk.name) {
                return chunk.name;
            }

            const modules = Array.from(chunk.modulesIterable);
            if (modules.length > 1) {
                return hashModule(modules);
            } else {
                if (modules[0].id.indexOf('/') !== -1) {
                    return hashModule(modules);
                }
                return modules[0].id;
            }
        })
    );

    return config;
};

const resolveModules = () => (config) => {
    config.resolve = Object.assign({}, config.resolve, {
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    });
    return config;
};

const SpeedMeasure = () => (config) => {
    const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
    const smp = new SpeedMeasurePlugin();

    return smp.wrap(config.plugins);
};

// == PRERENDER SPA PLUGIN == //
const prerender = () => (config) => {
    if (process.env.NODE_ENV !== 'production') {
        return config;
    }

    const PrerenderSPAPlugin = require('prerender-spa-plugin');
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
    config.plugins.push(
        new PrerenderSPAPlugin({
            // Index.html is in the root directory.
            staticDir: path.join(__dirname, 'build'),
            routes: ['/', '/list', '/base'],
            outputDir: path.join(__dirname, 'build', 'prerendered'),
            // Optional minification.
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                keepClosingSlash: true,
                sortAttributes: true,
            },

            renderer: new Renderer({
                renderAfterTime: 500,
            }),
        })
    );

    return config;
};

// 获取 package.json 中的主题配置信息
let theme = '';
try {
    if (pkgJSON && pkgJSON.buildConfig && pkgJSON.buildConfig.theme && pkgJSON.buildConfig.theme.alifd) {
        theme = pkgJSON.buildConfig.theme.alifd;
    }
} catch (e) {
    console.error(e);
    console.log(`请在 package.json 中配置
        "buildConfig":{
            "theme": {
                "alifd": "@alifd/theme-xxx",
            }
        }`);
}

module.exports = override(
    buildNotifier(),
    buildProgress(),
    applyTheme(),
    addPostcssPlugins([
        // 合并重复项
        require('css-mqpacker')(),
    ]),
    stylelint(),
    useEslintRc(),
    useBabelRc(),
    addWebpackAlias({
        ['@node_modules']: path.resolve(__dirname, 'node_modules'),
        // style样式重置文件别名
        ['@reset']: path.resolve(__dirname, 'style/basis/_reset.scss'),
        // style公共配置文件别名，包括mixins和utils等
        ['@settings']: path.resolve(__dirname, 'src/_settings.scss'),
        // 主题名称，根据当前项目使用的主题而定
        ['@theme']: theme,
        // api接口相关别名
        ['@api']: path.resolve(__dirname, 'src/api'),
        // 项目公共资源文件夹别名
        ['@assets']: path.resolve(__dirname, 'src/assets'),
        // 项目组件文件夹别名
        ['@components']: path.resolve(__dirname, 'src/components'),
        // layouts文件夹别名
        ['@layouts']: path.resolve(__dirname, 'src/layouts'),
        // modules文件夹别名
        ['@modules']: path.resolve(__dirname, 'src/modules'),
        // pages文件夹别名
        ['@pages']: path.resolve(__dirname, 'src/pages'),
        // routes文件夹别名
        ['@routes']: path.resolve(__dirname, 'src/routes'),
        // 路由配置文件别名
        ['@routerConfig']: path.resolve(__dirname, 'src/routerConfig.js'),
        // 菜单配置文件别名
        ['@menuConfig']: path.resolve(__dirname, 'src/menuConfig.js'),
        // stores文件夹别名
        ['@stores']: path.resolve(__dirname, 'src/stores'),
        // utils文件夹别名
        ['@utils']: path.resolve(__dirname, 'src/utils'),
    }),
    minimizer(),
    // codeSplitOptimize(),
    // prerender(),
    // process.env.NODE_ENV === 'production' && SpeedMeasure(),
    process.env.BUNDLE_VISUALIZE && addBundleVisualizer()
);

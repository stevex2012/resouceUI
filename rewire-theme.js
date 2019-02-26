// 飞冰主题加载相关
const pkgJSON = require(`${__dirname}/package.json`);

function rewireTheme(config, env, sassOptions = {}) {
    // 获取 package.json 中的主题配置信息
    let theme = '';
    try {
        if (pkgJSON && pkgJSON.buildConfig && pkgJSON.buildConfig.theme && pkgJSON.buildConfig.theme.ice) {
            theme = pkgJSON.buildConfig.theme.ice;
        }
    } catch (e) {
        console.error(e);
        console.log(`请在 package.json 中配置
            "buildConfig":{
                "theme": {
                    "ice": "@icedesign/theme",
                }
            }`);
    }

    // 自动引入飞冰业务组件
    // https://github.com/alibaba/ice/tree/master/tools/webpack-plugin-import
    const WebpackPluginImport = require('webpack-plugin-import');

    config.plugins.push(
        new WebpackPluginImport([
            {
                // ICE 业务组件
                libraryName: new RegExp(`${theme.split('/')[0]}\/.*`),
            },
        ])
    );

    return config;
}

module.exports = rewireTheme;

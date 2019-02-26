/** src/setupProxy.js */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/api', {
            target: 'http://localhost',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
};

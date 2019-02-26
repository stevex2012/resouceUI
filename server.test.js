const express = require('express');
const path = require('path');
const app = express();
// const proxy = require('http-proxy-middleware');

app.use('/', (req, res, next) => {
    console.log(`Receive URL: ${req.path} `);
    next();
});

//意见反馈的接口代理,由于在测试服务器上代理有问题，所以暂时不代理这个接口
// const context = ['/api/jeecms'];
// const options = {
//     target: '/',
//     changeOrigin: true,
//     pathRewrite:{
//       '^/api':'/'
//     },
// }
// const apiProxy = proxy(options);
// app.use(context, apiProxy)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
    console.log('Running at http://localhost:3001');
});

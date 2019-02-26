const express = require('express');
const path = require('path');
const app = express();
/**
 * 在正式服务器上用来做代理的
 */
// const proxy = require('http-proxy-middleware');

// //context可以是单个字符串，也可以是多个字符串数组
// const context = ['/'];
// //options可选的配置参数请自行看readme.md文档
// //，通常只需要配置target，也就是你的api所属的域名
// const options = {
//     target: '/',
//     pathRewrite:{
//       '^/app':''
//     },
//     changeOrigin: true
// }
// //将options对象用proxy封装起来，作为参数传递
// const apiProxy = proxy(options);
// //在测试环境的时候可以不用代理
// app.use(context, apiProxy)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
    console.log('Running at http://localhost:3001');
});

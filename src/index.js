// 低版本浏览器兼容
// import './polyfill';
import React from 'react';
import { render } from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from '@stores';
import { ErrorBoundary } from './components';
import moment from 'moment';
import * as serviceWorker from './serviceWorker';
import './index.scss';
// 方式1：手工引入，适合简单项目
// import App from './App';
// 方式2：routerConfig配置方式，适合复杂项目
import router from './router';

// 开启mobx严格模式
configure({
    enforceActions: 'observed',
});

const App = () => {
    return (
        <ErrorBoundary>
            <Provider {...rootStore}>{router}</Provider>
        </ErrorBoundary>
    );
};

moment.locale('zh-cn');

const CONTAINER = document.getElementById('root');

if (!CONTAINER) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

render(<App />, CONTAINER);

// 热加载，局部刷新
if (process.env.REACT_APP_HMR && module.hot) {
    module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

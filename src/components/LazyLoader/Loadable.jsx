// https://www.smooth-code.com/open-source/loadable-components/
import ttLoadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import { spinner as loadSpinner } from './LoadSpinner';

/**
 * 页面导入组件,支持自定义加载动画
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Function} spinner 加载的的loading, 默认为loadSpinner
 * @returns {Component}
 */
export const loadable = (func, spinner) =>
    ttLoadable(func, {
        fallback: spinner || loadSpinner(),
    });

/**
 * 页面导入组件,支持延时加载
 * @param {Promise} promise 动态引入的返回值, 如 import('./a/b/c')
 * @param {Function} spinner 加载的的loading, 默认为loadSpinner
 * @param {Number} delay 延迟时间, 默认200ms
 * @returns {Component}
 */
export const loadableDelay = (promise, spinner, delay = 200) =>
    ttLoadable(() => pMinDelay(promise, delay), {
        fallback: spinner || loadSpinner(),
    });

/**
 * 页面导入组件,支持加载超时
 * @param {Promise} promise 动态引入的返回值, 如 import('./a/b/c')
 * @param {Function} spinner 加载的的loading, 默认为loadSpinner
 * @param {Number} time 过期时间, 默认5000ms
 * @returns {Component}
 */
export const loadableTimeout = (promise, spinner, time = 5000) =>
    ttLoadable(() => timeout(promise, time), {
        fallback: spinner || loadSpinner(),
    });

/**
 * lib动态导入组件
 * @param {String} libName 需要动态加载的库的名字
 * @returns {Function}
 */
export const loadableLib = (libName) => ttLoadable.lib(() => import(`${libName}`));

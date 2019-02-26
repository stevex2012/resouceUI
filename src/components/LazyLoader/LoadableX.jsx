// https://github.com/jamiebuilds/react-loadable
import tLoadable from 'react-loadable';
import { spinner as loadSpinner } from './LoadSpinner';

/**
 * 页面导入组件,支持自定义加载动画
 * Create a loadable component "Suspense" ready.
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Function} spinner 加载的的loading, 默认为loadSpinner
 * @returns {Component}
 */
export const loadableX = (func, spinner) =>
    tLoadable({
        loader: func,
        loading: spinner || loadSpinner,
    });

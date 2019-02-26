// https://www.smooth-code.com/open-source/loadable-components/
import React, { Suspense } from 'react';
import { lazy } from '@loadable/component';
import { spinner as loadSpinner } from './LoadSpinner';

/**
 * 页面导入组件,支持自定义加载动画
 * Create a loadable component "Suspense" ready.
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Function} spinner 加载的的loading, 默认为loadSpinner
 * @returns {Component}
 */
export const lazyX = (func, spinner) => {
    const OtherComponent = lazy(func);
    return function MyComponent() {
        return (
            <Suspense fallback={spinner || loadSpinner()}>
                <OtherComponent />
            </Suspense>
        );
    };
};

/**
 * lib动态导入组件
 * Create a loadable library "Suspense" ready
 * @param {String} libName 需要动态加载的库的名字
 * @returns {Function}
 */
export const lazyLib = (libName) => lazy.lib(() => import(`${libName}`));

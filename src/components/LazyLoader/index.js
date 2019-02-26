// react-code-splitting 方式
import { asyncLoad } from './Async';
// react-loadbale 方式
import { loadableX } from './LoadableX';
// react原生 lazy 方式
import { lazy } from './Lazy';
// @loadable/component 方式
import { lazyX, lazyLib } from './LazyX';
import { loadable, loadableDelay, loadableTimeout, loadableLib } from './Loadable';

export { asyncLoad, loadableX, lazy, lazyX, lazyLib, loadable, loadableDelay, loadableTimeout, loadableLib };

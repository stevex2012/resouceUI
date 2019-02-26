import _ from 'lodash';
// 基础方法集

/**
 * @description 用于获取url中的指定参数
 * @param {String} val 查询key
 * @returns {*} 对应的value，没有返回null
 */
export function getQueryString(val) {
    const reg = new RegExp(`(^|&)${val}=([^&]*)(&|$)`);
    const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

/**
 * ?a=1&b=2  => {a:'1',b:'2'}
 * @param {String} lsearch =location.search
 */
export const search2obj = (lsearch) => {
    const search = (lsearch && lsearch.substr(1)) || '';
    if (!search) {
        return {};
    }
    const paramsList = search.split('&');
    const params = {};
    paramsList.forEach((i) => {
        if (!i) {
            return;
        }

        const p = i.split('=');
        if (p.length === 1) {
            params[p[0]] = '';
        } else {
            params[p[0]] = p[1];
        }
    });

    return params;
};

/**
 * {a:'1',b:'2'} => ?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 */
export const obj2search = (obj) => {
    const search = Object.keys(obj)
        .map((i) => `${i}=${obj[i]}`)
        .join('&');
    if (!search) {
        return '';
    }
    return `?${search}`;
};

/**
 * {a:'1',b:'2'} => http://xxxxxxx?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 */
export const getUrlWithSearchObj = (obj) => {
    const params = search2obj(window.location.search);
    Object.assign(params, obj);

    return `${window.location.pathname}${obj2search(params)}`;
};

/**
 * get value of name from cookie
 * @param {String} name cookie name
 */
export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * @description 对指定字符串进行base64编码
 * @param {String} val 需要编码的数据
 * @returns {*} 编码后的数据
 */
export function urlEncodeBase64(val) {
    return window.btoa(unescape(encodeURIComponent(val)));
}

/**
 * @description 对指定字符串进行base64解码
 * @param {String} val 需要解码的数据
 * @returns {*} 解码后端数目
 */
export function urlDecodeBase64(val) {
    return decodeURIComponent(escape(window.atob(val)));
}

// 字母前加前缀
export const addPrefix = (str, prefix = 'btn') => {
    const arr = _.upperFirst(str.trim()).split(/\s+/);
    const tResult = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        tResult.push(`${prefix}${arr[i]}`);
    }
    return tResult.join(' ');
};

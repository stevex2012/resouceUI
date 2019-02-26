/**
 * 这是登录授权的公共页面，独立于资源中心其他页面
 */

const _decode = function(s) {
    const pl = /\+/g;
    return decodeURIComponent(s.replace(pl, ' '));
};
const getQueryParams = function(searchStr) {
    let match;
    const search = /([^&=]+)=?([^&]*)/g;
    const query = searchStr.substring(1);
    const urlParams = {};
    while (true) {
        match = search.exec(query);
        if (!match) break;
        urlParams[_decode(match[1])] = _decode(match[2]);
    }
    return urlParams;
};
const auth = function(code, cb) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    const rq = {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: `code=${code}`,
    };
    fetch('http://10.64.13.160:9090/mock/111/wxapi/getUserInfoByCode', rq)
        .then((res) => {
            if (!res || res.status >= 400) {
                showError(`发生错误:${res.status}`);
                return undefined;
            } else {
                return res.json();
            }
        })
        .then((json) => {
            let cbUri = cb;
            if (Number(json.result) === 0) {
                if (cb.indexOf('?') > -1) {
                    cbUri += `&token=${json.data.token}`;
                } else {
                    cbUri += `?token=${json.data.token}`;
                }
                window.location.replace(cbUri);
            } else {
                showError('发生错误');
            }
        })
        .catch((error) => {
            console.error(error);
            showError('发生错误');
        });
};
const showError = function(error) {
    const p = document.getElementById('msg');
    p.innerText = error;
};
const params = getQueryParams(window.location.search);
if (params && params.code && params.cb) {
    auth(params.code, params.cb);
} else {
    showError('缺失参数');
}

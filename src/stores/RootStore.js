import { action, runInAction } from 'mobx';
import { Agent, ResponseCode } from '@api';
import { Message as Toast } from '@components';
import { PersistData, UIStore, UserStore, PersonStore } from '@stores';

class RootStore {
    constructor() {
        this.agent = new Agent();
        const persistData = new PersistData();
        this.userStore = new UserStore(this, persistData);
        this.UIStore = new UIStore(this, persistData);
        //人员管理store
        this.personStore = new PersonStore(this, persistData);
    }

    /**
     * @description 已application/json方式请求接口
     * @param {*} url url
     * @param {*} params 参数
     * @param {*} showLoading 是否显示loading
     * @returns Promise
     */
    sendPostByJson(url, params, showLoading) {
        showLoading && this.showLoading();
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
        const rq = {
            method: 'POST',
            headers: headers,
            //提交cookie
            credentials: 'include',
            //允许跨域
            mode: 'cors',
            body: JSON.stringify(this._buildParams(params)),
        };
        return this.agent.sendRequestByJson(url, rq, 'POST').then((json) => this._handleData(json, url, params));
    }
    /**
     * 发送POST请求
     * @param {string} url 请求地址
     * @param {object} _params 默认都带token，如果不需要带token，请传一个noToken:true
     * @param {boolen} showLoading 不显示loading图像
     * @returns Promise
     */
    sendPost(url, _params, showLoading) {
        showLoading && this.showLoading();
        const params = this._buildParams(_params);
        return this.agent.post(url, params).then((json) => this._handleData(json, url, params));
    }
    /**
     * 发生GET请求
     * @param {string} url 请求地址
     * @param {object} _params 默认都带token，如果不需要带token，请传一个noToken:true
     * @param {boolen} showLoading 不显示loading图像
     * @returns Promise
     */
    sendGet(url, _params, showLoading) {
        showLoading && this.showLoading();
        const params = this._buildParams(_params);
        return this.agent.get(url, params).then((json) => this._handleData(json, url, params));
    }
    /**
     * @description 显示提示信息，默认3秒
     * @param {*} msg 提示的内容
     * @param {*} distance 展示的时长 单位：秒
     */
    showToast(msg, distance) {
        // 默认展示时长
        const defaultTime = 3;
        Toast.hide();
        Toast.notice(msg, distance || defaultTime, null, false);
    }
    /**
     * @description 显示加载框，期间不可操作
     * @param {*} msg 下面显示的提示内容，默认‘加载中’
     */
    @action
    showLoading() {
        this.UIStore.isShowLoading = true;
    }
    @action
    hideLoading() {
        this.UIStore.isShowLoading = false;
    }
    /**
     * 构建参数
     * @param {*} par 参数
     * @return 返回组装后的参数
     */
    _buildParams(par) {
        const params = { ...par };
        //某些接口希望不传token，就需要删除token字段，默认都带token
        if (params.noToken) {
            delete params.noToken;
            delete params.token;
        } else {
            /*如果没有this.UIStore.token就不代token，
            如果有params.token就不将this.UIStore.token覆盖它，
            如果有this.UIStore.token而没有params.token，就将this.UIStore.token付个params.token

            只是返回了，没有赋值给它。彭雪梅修改，添加了赋值
            */
            params.token = this.UIStore.token && (params.token || this.UIStore.token);
        }
        return params;
    }
    /**
     * @description 处理获取的结果（主要是为了实现token自动刷新功能）
     * @param {*} json 获取到的结果
     * @param {*} url url
     * @param {*} params 参数
     * @returns 收到的数据
     */
    _handleData(json, url, params) {
        this.hideLoading();

        //意见反馈页面接口调用
        if (json && !json.result && json.resultCode) {
            return json;
        }

        //标准请求分支
        if (!json || typeof json.result === 'undefined') {
            return {};
        } else {
            switch (json.result.toString()) {
                //获取数据成功
                case '0':
                case 'true': {
                    return json;
                }
                //token过期
                case '-1': {
                    return this.UIStore.refreshToken(url, params);
                }
                default: {
                    console.log(`Requst is get Error,Code :${json.result}`);
                    const msg = ResponseCode.showMsg(json.result);
                    msg && this.showToast(msg);
                    return json;
                }
            }
        }
    }
    /**
     * 获取url中的查询字符串
     * @param {*} searchStr url上的查询
     * @return 获得的参数对象
     */
    getQueryParams(searchStr) {
        let match;
        const search = /([^&=]+)=?([^&]*)/g;
        const query = searchStr.substring(1);
        const urlParams = {};
        while (true) {
            match = search.exec(query);
            if (!match) break;
            urlParams[this._decode(match[1])] = this._decode(match[2]);
        }
        return urlParams;
    }
    _decode(s) {
        const pl = /\+/g;
        return decodeURIComponent(s.replace(pl, ' '));
    }
}
export default runInAction(() => new RootStore());

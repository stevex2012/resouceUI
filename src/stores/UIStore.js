/**
 * 保存token等信息和其他公共信息
 */
import { observable, action } from 'mobx';
import { ApiUrls } from '@api';

class UIStore {
    /**
     * 浏览器判断，true=微信，false=h5
     */
    inWeChat;
    /**
     * 渠道来源,1=app,5=微信，6=h5，其它数字=外部引用渠道
     */
    biz;
    @observable
    token = this.persistData.get('token', this);
    //是否正在显示加载款
    @observable
    isShowLoading = false;
    @observable
    inputVal = 0; //购物车 cartItem组件中使用 弹出框修改商品数量

    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
        //持久化token
        this.persistData.set('token', this);

        //判断是否在微信浏览器还是普通浏览器
        this.inWeChat = /micromessenger/.test(navigator.userAgent.toLowerCase());
        //微信和H5端的biz编码
        const wxBiz = 5;
        const h5Biz = 6;

        this.setBiz(this.inWeChat ? wxBiz : h5Biz);
        const params = rootStore.getQueryParams(window.location.search);
        //获得传参过来的token
        if (params.t) this.token = params.t;
    }

    @action
    setToken(token) {
        this.token = token;
    }
    @action
    setBiz(biz) {
        this.biz = biz || this.inWeChat;
    }
    /**
     * @description token 过期后自动刷新 token
     * @param {String} url 调用刷新的接口
     * @param {Object} params 调用刷新的接口的参数
     * @param {String} type 请求类型
     * @returns {Promise} 请求对应的promise对象
     */
    @action
    refreshToken(url, params, type) {
        this.setToken(undefined);
        return this.rootStore
            .sendPost(ApiUrls.RELOAGIN, {
                mobile: this.rootStore.userStore.mobile,
                password: this.rootStore.userStore.txtKey,
                mod: this.rootStore.userStore.mod,
            })
            .then((json) => {
                if (json.result === '0') {
                    const tData = json.data;
                    //刷新成功
                    this.setToken(tData.token);
                    this.rootStore.userStore.setTxtKey(tData.password);
                    this.rootStore.userStore.setMod(tData.key);

                    params.token = tData.token;

                    //刷新成功后，继续之前的接口调用
                    switch (type) {
                        case 'post':
                            return this.rootStore.sendPost(url, params);
                        case 'get':
                        default:
                            return this.rootStore.sendPost(url, params);
                    }
                } else {
                    this.rootStore.showToast('登录过期,请重新登录');
                    return {};
                }
            });
    }
    @action
    setInputVal(val) {
        this.inputVal = val;
    }
    @action
    handleIncrease() {
        this.inputVal++;
    }
    @action
    handleReduce() {
        this.inputVal--;
    }

    /**
     * 退出登录
     */
    loginOut() {
        this.setToken(null);
    }
}
export default UIStore;

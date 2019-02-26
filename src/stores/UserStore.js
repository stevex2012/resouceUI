/**
 * 用户信息与登录信息
 */
import { observable, action, computed } from 'mobx';
import { ApiUrls } from '@api';
import { i18nValue, imgAvatar } from '@assets';

class UserStore {
    @observable
    mobile = this.persistData.get('mobile', this);
    //头像
    @observable
    img = this.persistData.get('img', this);
    //加密用的膜
    @observable
    mod = this.persistData.get('mod', this);
    //昵称
    @observable
    nickName = this.persistData.get('nickName', this);
    //加密后的密码
    @observable
    txtKey = this.persistData.get('txtKey', this);
    //图片验证码的链接地址，undefined=不需要现在验证码
    @observable
    needPicCode;
    //图片验证码输入的状态 0=未输入，1=输入正确，-1=输入错误
    @observable
    picCodeState = 0;
    //当前的号码是否已经被注册了
    @observable
    phoneRegisted;
    oid;
    //加密的过期时间
    exp;
    //性别
    @observable
    sex;
    //生日
    @observable
    birthday;
    //意见反馈
    feeds;
    /**
     * Penny
     * @description 修改监听我的足迹的字段
     * @memberof UserStore
     */
    //监听足迹data ,用于存储所有
    @observable
    footPrintData;
    //监听是否加载完成，页面去掉下拉加载更多！
    @observable
    footPrintIsFinish = false; //默认没有加载完

    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
        //设置需要存储到本地字段
        this.persistData.set('img', this);
        this.persistData.set('mod', this);
        this.persistData.set('nickName', this);
        this.persistData.set('mobile', this);
        this.persistData.set('txtKey', this);
    }

    //用户信息
    @computed
    get userInfo() {
        return {
            nickName: this.nickName || '某某某',
            mobile: this.mobile || '13888888888',
            img: this.img || imgAvatar,
            sex: this.sex,
            birthday: this.birthday,
        };
    }

    @action
    setMobile(mobile) {
        this.mobile = mobile;
    }
    @action
    setTxtKey(txtKey) {
        this.txtKey = txtKey;
    }
    @action
    setMod(mod) {
        this.mod = mod;
    }
    @action
    setNeedPicCode(imgUrl) {
        this.needPicCode = imgUrl;
    }
    @action
    setPicCodeState(state) {
        this.picCodeState = state;
    }
    @action
    setPhoneRegisted(registed) {
        this.phoneRegisted = registed;
    }
    @action
    setSex(sex) {
        this.sex = sex;
    }
    @action
    setBirthday(birth) {
        this.birthday = birth;
    }
    @action
    setNickName(name) {
        this.nickName = name;
    }

    /**
     * 登录，图片验证码是在输入5次错误密码后需要的
     * @param {*密码} password
     * @param {*图片验证码} picCode
     */

    login(password, picCode) {
        if (!this.mobile || !password) {
            this.rootStore.showToast(i18nValue.noNameOrPwd);
            return;
        }
        if (this.mobile.length !== 11) {
            this.rootStore.showToast(i18nValue.wrongPhoneNumber);
            return;
        }
        return this.rootStore.sendGet(ApiUrls.GEN_PUBLICKEY, {}, true).then((json) => {
            if (!json.data) return;
            const mod = json.data.mod;
            const exp = json.data.exp;
            const publicKey = window.RSAUtils.getKeyPair(exp, '', mod); //公钥
            const txtKey = window.RSAUtils.encryptedString(publicKey, encodeURIComponent(password)); //密文
            let params = {
                mobile: this.mobile,
                password: txtKey,
                mod: mod,
            };
            picCode && (params.picCode = picCode);
            return this.rootStore.sendPost(ApiUrls.LOGIN_ENCRYPT, params, true).then(
                action('loginSuccess', (loginJson) => {
                    //109是能正常登录，但需要提示修改密码
                    if (loginJson && (loginJson.result === '0' || loginJson.result === '109')) {
                        //清除图片验证码
                        this.setNeedPicCode(undefined);
                        this.setPicCodeState(0);
                        this.loginSuccess(loginJson, password);
                        return true;
                    } else if (loginJson.result === '118' || loginJson.result === '103') {
                        this.getPicCodeImage();
                        return false;
                    } else {
                        //在有验证码的时候，登录出错，就重新获取一张验证码
                        if (this.needPicCode) {
                            this.getPicCodeImage();
                        }
                        return false;
                    }
                })
            );
        });
    }
    /**
     * 发送短信验证码
     */

    getSMSCode() {
        return this.rootStore.sendPost(ApiUrls.GET_SMS_CODE, { mobile: this.mobile }, true).then((json) => {
            if (json && json.result === '0') {
                this.rootStore.showToast(i18nValue.codeSendSuccess);
                return true;
            } else {
                return false;
            }
        });
    }
    /**
     * 短信登录接口
     * @param {*短信验证码} code
     * @param {*渠道，1=APP,5=微信商城，6=H5} biz
     */

    longinBySMSCode(code) {
        return this.rootStore
            .sendPost(
                ApiUrls.LOGIN_BY_SMS_CODE,
                {
                    mobile: this.mobile,
                    code: code,
                    biz: this.rootStore.UIStore.biz,
                },
                true
            )
            .then((loginJson) => {
                if (loginJson && loginJson.result === '0') {
                    this.loginSuccess(loginJson);
                    return true;
                }
            });
    }
    /**
     * @description 登录成功
     * @param {*} loginJson 成功返回的数据
     * @param {*} password 密码
     */
    @action
    loginSuccess(loginJson, password) {
        this.rootStore.UIStore.setToken(loginJson.data.token);
        this.img = loginJson.data.img;
        this.nickName = loginJson.data.nickname;
        //登录成功后，初始化用户相关信息
        this.initLoginSuccess();
        //如果返回字段有mod说明是密码登录，没有则是短信登录
        if (loginJson.data.mod) {
            this.mod = loginJson.data.mod;
            const publicKey = window.RSAUtils.getKeyPair(loginJson.data.exp, '', this.mod); //公钥
            const txtKey = window.RSAUtils.encryptedString(publicKey, encodeURIComponent(password)); //密文
            this.setTxtKey(txtKey);
        } else {
            this.mod = undefined;
            this.txtKey = undefined;
        }
    }
    /**
     * 获得验证码地址
     */

    getPicCodeImage(mobile = this.mobile) {
        const random = Math.random();
        this.setNeedPicCode(`${ApiUrls.PIC_CODE}?phone=${this.mobile}&random=${random}`);
        this.setPicCodeState(0);
    }
    /**
     * 检查图片验证码输入是否正确
     * @param {*输入的验证码} code
     */

    checkPicCode(mobile = this.mobile, code) {
        this.rootStore
            .sendPost(ApiUrls.CHECK_PIC_CODE, {
                picCode: code,
                phone: mobile,
            })
            .then((json) => {
                if (json.result === '0') {
                    this.setPicCodeState(1);
                } else {
                    this.setPicCodeState(-1);
                }
            });
    }
    /**
     * 检测电话号码是否被注册
     * @param {*电话号码} number
     */

    checkPhoneNumber(number) {
        return this.rootStore
            .sendPost(
                ApiUrls.CHECK_PHONE,
                {
                    phone: number,
                },
                true
            )
            .then((json) => {
                if (json.result === 'false') {
                    this.setPhoneRegisted(false);
                } else if (json.result === 'true') {
                    this.setPhoneRegisted(true);
                }
                this.setPicCodeState(0);
                return json;
            });
    }
    /**
     * 检查短信验证码是否正确
     * @param {*短信验证码} {
     * code,
     * biz
     * }
     * //biz业务场景，1：修改密码(注册等其他场景)，2：忘记密码(找回密码)
     */

    checkSMSCode(params) {
        const code = params.code;
        if (code && code.length === 6) {
            return this.rootStore.sendPost(ApiUrls.CHECK_SMS_CODE, {
                phone: this.mobile,
                code: code,
                biz: params.biz,
            });
        } else {
            this.rootStore.showToast(i18nValue.codeImcomplete);
        }
    }
    /**
     * 获取注册时用的短信验证码,修改密码、忘记密码等
     * @param {*图片验证码} {
     * picCode,
     * biz
     * }
     * //biz业务场景，1：修改密码(注册等其他场景)，2：忘记密码(找回密码)
     */

    getRegisterSMSCode(params) {
        return this.rootStore
            .sendPost(
                ApiUrls.SEND_REGISTER_SMS_CODE,
                {
                    phone: this.mobile,
                    biz: params.biz,
                    picCode: params.picCode,
                    noToken: true,
                },
                true
            )
            .then((json) => {
                if (json && json.result === '0') {
                    this.rootStore.showToast(i18nValue.codeSendSuccess);
                    return true;
                } else if (json && json.result === '103') {
                    this.rootStore.showToast(i18nValue.picVerError);
                    return false;
                } else {
                    return false;
                }
            });
    }

    /**
     * 注册
     * @param {*密码} password
     */

    register(password, smsCode) {
        if (!password) {
            this.rootStore.showToast(i18nValue.pwdEmpty);
            return;
        }
        if (!this.checkPassword(password)) {
            this.rootStore.showToast(i18nValue.pwdError);
            return;
        }
        if (this.mobile.length !== 11) {
            this.rootStore.showToast(i18nValue.wrongPhoneNumber);
            return;
        }
        return this.rootStore.sendGet(ApiUrls.GEN_PUBLICKEY, {}, true).then((json) => {
            if (!json.data) return;
            const mod = json.data.mod;
            const exp = json.data.exp;
            const publicKey = window.RSAUtils.getKeyPair(exp, '', mod); //公钥
            const txtKey = window.RSAUtils.encryptedString(publicKey, encodeURIComponent(password)); //密文
            const params = {
                biz: this.rootStore.UIStore.biz,
                password: txtKey,
                mod: mod,
                mobile: this.mobile,
                smsCode: smsCode,
            };
            return this.rootStore.sendPost(ApiUrls.REGISTER_ENCRYPT, params);
        });
    }
    /**
     * 用正则校验密码,8-16位字母+数字或者符号的组合
     * @param {*} password
     */

    checkPassword(password) {
        const patrn = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
        if (!password || password.length < 8 || password > 16) return false;
        return patrn.test(password);
    }
    /**
     * 获取用户信息
     */
    getUserInfo() {
        this.rootStore.sendGet(ApiUrls.GET_USER_INFO).then((json) => {
            if (json && json.result === '0') {
                this.setSex(json.data.sex);
                this.setBirthday(json.data.birthday);
            }
        });
    }
    /**
     * 修改用户信息
     */

    updataUserInfo(params) {
        return this.rootStore.sendPost(ApiUrls.GET_USER_INFO, params, true).then((json) => {
            if (json && json.result === '0') {
                return true;
            }
        });
    }
    /**
     * 登录成功后，初始化用户相关信息
     */
    initLoginSuccess() {
        this.rootStore.orderStore.loginSuccess();
        this.rootStore.cartStore.loginSuccess();
    }
    /**
     * 退出登录，真正的退出,清空所有用户相关数据
     */
    mainLoginOut() {
        this.rootStore.UIStore.loginOut();
        this.rootStore.orderStore.loginOut();
        this.rootStore.cartStore.loginOut();
        //userStore
        this.setMobile(null);
        this.setMod(null);
        this.setTxtKey(null);
    }
    /**
     * 修改密码
     */

    updataPassword(info) {
        if (!info.oldPwd) {
            this.rootStore.showToast(i18nValue.oriPwdEmpty);
            return;
        }
        if (!info.newPwd) {
            this.rootStore.showToast(i18nValue.newPwdEmpty);
            return;
        }
        if (!info.smsCode) {
            this.rootStore.showToast(i18nValue.smsCodeInvalid);
            return;
        }
        if (!this.checkPassword(info.newPwd)) {
            this.rootStore.showToast(i18nValue.newPwdFormatError);
            return;
        }
        if (this.mobile.length !== 11) {
            this.rootStore.showToast(i18nValue.wrongPhoneNumber);
            return;
        }
        let mod;
        let password;
        let newMod;
        let newPassword;
        return this.getModPwd(info.oldPwd).then((json) => {
            if (json) {
                mod = json.mod;
                password = json.password;
                return this.getModPwd(info.newPwd).then((json1) => {
                    if (json1) {
                        newMod = json1.mod;
                        newPassword = json1.password;
                        return this.rootStore.sendPost(ApiUrls.UPDATA_PASSWORD, {
                            mod: mod,
                            password: password,
                            newMod: newMod,
                            newPassword: newPassword,
                            mobile: this.mobile,
                            smsCode: info.smsCode,
                        });
                    } else {
                        return false;
                    }
                });
            } else {
                return false;
            }
        });
    }
    /**
     * 返回加密后的mod和密码
     * @param {} password
     */

    getModPwd(password) {
        return this.rootStore.sendGet(ApiUrls.GEN_PUBLICKEY, {}, true).then((json) => {
            if (!json.data) return;
            const mod = json.data.mod;
            const exp = json.data.exp;
            const publicKey = window.RSAUtils.getKeyPair(exp, '', mod); //公钥
            const txtKey = window.RSAUtils.encryptedString(publicKey, encodeURIComponent(password)); //密文
            return {
                mod: mod,
                password: txtKey,
            };
        });
    }
}
export default UserStore;

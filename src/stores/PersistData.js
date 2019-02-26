/**
 * 用于将需要的数据保存到本地存储如，LocalStorage
 */
import { reaction } from 'mobx';

class PersistData {
    /**
     * 设置对某个Store下的某个字段进行监听，如果该字段有变化就存储到LocalStorage
     * 注:尽量不要使用Object对象来进行持久化，因为对象中的某个值改变不会触发反应函数。
     * 如果必须使用对象，那请使用深拷贝对对象赋值
     * @param {String} name 字段名
     * @param {String} store Store名
     * @param {Boolean} session 是否用session保存
     * @param {Boolean} global  是否用于全局，true则存入本地storage时不携带store名
     */

    set(name, store, session, global = false) {
        reaction(
            () => store[name],
            (data) => {
                const storeage = session ? window.sessionStorage : window.localStorage;
                const keyName = global ? `${name}` : `${store.constructor.name}_${name}`;
                if (typeof data !== 'undefined' && typeof data !== 'function') {
                    storeage.setItem(keyName, typeof data === 'object' ? JSON.stringify(data) : data);
                } else {
                    storeage.removeItem(keyName);
                }
            }
        );
    }
    /**
     * 获取转换被存储的字段，如果能转换为对象，则会自动转换为对象
     * @param {string} name 字段名
     * @param {string} store Store名
     * @param {boolean} session 是否用session保存
     * @param {boolean} global  是否用于全局，true则存入本地storage不携带store名
     * @returns 读取到的数据
     */

    get(name, store, session, global = false) {
        const storeage = session ? window.sessionStorage : window.localStorage;
        const keyName = global ? `${name}` : `${store.constructor.name}_${name}`;

        let str = storeage.getItem(keyName);
        try {
            str = JSON.parse(str);
        } catch (error) {
            return str;
        }
        return str;
    }
}
export default PersistData;

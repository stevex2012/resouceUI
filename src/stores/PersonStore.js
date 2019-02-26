import { observable, action } from 'mobx';
import { ApiUrls } from '@api';
//测试数据，人员详情
const testDetailData = {
    userName: 'superVip',
    sex: '男',
    pCount: '6868',
    mobile: '18725873459',
    order: '89898989898',
    //停用启动
    isDelete: 'N',
    isForbidden: 'N',
    organizationList: [
        {
            id: 'clueOrg',
            name: '长安汽车',
            code: '400020',
        },
        {
            id: 'dataOrg1',
            name: '欧尚汽车',
            code: '400021',
        },
        {
            id: 'dataOrg2',
            name: '新能源',
            code: '400022',
        },
        {
            id: 'dataOrg3',
            name: '轻型车',
            code: '400023',
        },
        {
            id: 'dataOrg4',
            name: '商用车',
            code: '400024',
        },
    ],
    roleList: [
        {
            id: 'clueAdmin',
            name: '线索管理员',
            code: '300020',
        },
        {
            id: 'dataAdmin1',
            name: '数据管理员1',
            code: '300021',
        },
        {
            id: 'dataAdmin2',
            name: '数据管理员2',
            code: '300022',
        },
        {
            id: 'dataAdmin3',
            name: '数据管理员3',
            code: '300023',
        },
        {
            id: 'dataAdmin4',
            name: '数据管理员4',
            code: '300024',
        },
    ],
};
/**
 *人员管理store
 *
 * @class PersonStore
 */
class PersonStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
    }
    //人员详情信息 保存接口数据
    pDetail = testDetailData;
    /**
     *获取人员详情
     *
     * @param {*} pId 人员id
     * @param {boolean} [showLoading=true] 是否显示loading菊花
     * @returns 接口返回 promise
     * @memberof PersonStore
     */
    getPersonDetail(pId, showLoading = true) {
        return this.rootStore.sendGet(ApiUrls.GET_RESOURCE_USER_INFO, { id: pId }, showLoading);
    }
    //修改人员信息
    modifyPInfo(params) {
        return this.rootStore.sendPost(ApiUrls.POST_UPDATE_USER_USERINFO, params);
    }
}

export default PersonStore;

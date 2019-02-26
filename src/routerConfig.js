// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import { BasicLayout, UserLayout, BlankLayout } from '@layouts';
import EditRoleInfo from './pages/EditRoleInfo';
import {
    UserLogin,
    PersonManage,
    OrganizationManage,
    ResourceManage,
    ResourceInfoEdit,
    RoleManage,
    EditInfo,
    PersonDetail,
} from '@pages';

const routerConfig = [
    {
        path: '/user/login',
        component: UserLogin,
    },
    {
        path: '/personmanage/persondetail/:pid',
        layout: BasicLayout,
        component: PersonDetail,
    },
    {
        path: '/personmanage',
        layout: BasicLayout,
        component: PersonManage,
    },
    {
        path: '/organizationmanage',
        layout: BasicLayout,
        component: OrganizationManage,
    },
    {
        path: '/resourcemanage/edit',
        layout: BasicLayout,
        component: ResourceInfoEdit,
    },
    {
        path: '/resourcemanage/',
        layout: BasicLayout,
        component: ResourceManage,
    },
    {
        path: '/rolemanage',
        layout: BasicLayout,
        component: RoleManage,
    },
    {
        path: '/editinfo',
        layout: BasicLayout,
        component: EditInfo,
    },
    {
        path: '/EditRoleInfo',
        layout: BasicLayout,
        component: EditRoleInfo,
    },
];

export default routerConfig;

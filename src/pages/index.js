// 页面注册
import { lazy } from '@components';

const UserLogin = lazy(() => import('./UserLogin'));
const PersonManage = lazy(() => import('./PersonManage'));
const OrganizationManage = lazy(() => import('./OrganizationManage'));
const ResourceManage = lazy(() => import('./ResourceManage/ResourceManage'));
const ResourceInfoEdit = lazy(() => import('./ResourceManage/EditResourceInfo'));
const RoleManage = lazy(() => import('./RoleManage'));
const EditInfo = lazy(() => import('./EditInfo'));
const PersonDetail = lazy(() => import('./PersonDetail'));

export {
    UserLogin,
    PersonManage,
    OrganizationManage,
    ResourceManage,
    ResourceInfoEdit,
    RoleManage,
    EditInfo,
    PersonDetail,
};

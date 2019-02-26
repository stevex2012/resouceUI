// 数据持久化
import PersistData from './PersistData.js';
// 业务Store，根据需要添加
import UserStore from './UserStore';
import UIStore from './UIStore';
//人员管理store
import PersonStore from './PersonStore';
// rootStore需要最后导入
import rootStore from './RootStore';

export { PersistData, UIStore, UserStore, PersonStore };
export default rootStore;

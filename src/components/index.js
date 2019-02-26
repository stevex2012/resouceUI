// 组件的统一出口

// 第三方库：@icedesign
import IceTitle from '@icedesign/title';
import IceContainer from '@icedesign/container';
import {
    FormBinderWrapper as IceFormBinderWrapper,
    FormBinder as IceFormBinder,
    FormError as IceFormError,
} from '@icedesign/form-binder';

export { IceContainer, IceTitle, IceFormBinderWrapper, IceFormBinder, IceFormError };

// 第三方库：@alifd
export {
    Icon,
    // 网格系统
    Grid,
    Card,
    // 消息提示
    Message,
    Input,
    Button,
    Checkbox,
    Radio,
    Select,
    Tag,
} from '@alifd/next';

// basis 基础组件
export * from './basis';

// block 板块组件
export * from './block';

// module 模块组件
export * from './module';

// layout 布局组件
export * from './layout';

// template 模板组件
export * from './template';

// loader 加载器
export * from './LazyLoader';

/**
 * @description 表单配置
 * @example {
        name: '',
        label: '',
        type: 'text',  // text,email,radio,select,tag
        size: 'large',
        style: { width: '100%' },
        formError: true,    // 自定义表单错误信息
        placeholder: '请输入用户名',    占位信息
        message: '必填',    // 验证提示
        dataSource: [{ label: '', value: '' }], // select框的options, checkbox和radio的子项
        validator: function() {},   // 验证规则
    }
 */

export default [
    {
        name: 'userName',
        label: '姓名',
        type: 'text',
        message: '必填',
        placeholder: '请输入姓名',
        formError: true,
        readOnly: true,
    },
    {
        name: 'sex',
        label: '性别',
        type: 'checkbox',
        message: '必填',
        placeholder: '请选择...',
        formError: true,
    },
    {
        name: 'pCount',
        label: '账号',
        type: 'text',
        message: '必填',
        placeholder: '请输入账号',
        formError: true,
    },
    {
        name: 'mobile',
        label: '手机号',
        type: 'text',
        message: '必填',
        placeholder: '请输入手机号',
        formError: true,
    },
    {
        name: 'order',
        label: '排序编号',
        type: 'text',
        message: '必填',
        placeholder: '请输入排序编号',
        formError: true,
    },
    {
        name: 'organizationList',
        type: 'tag',
        label: '所属组织',
    },
    {
        name: 'roleList',
        type: 'tag',
        label: '关联角色',
    },
];

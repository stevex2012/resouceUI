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
        name: 'resourceId',
        label: '资源ID',
        type: 'text',
        message: '必填',
        placeholder: '请输入资源ID',
        formError: true,
        readOnly: true,
    },
    {
        name: 'resourceName',
        label: '资源名称',
        type: 'text',
        message: '必填',
        placeholder: '请输入用户名',
        formError: true,
    },
    {
        name: 'resourceCode',
        label: '资源编码',
        type: 'text',
        message: '必填',
        placeholder: '请输入用户名',
        formError: true,
    },
    {
        name: 'resourcePid',
        label: '上级资源',
        type: 'select',
        message: '必填',
        placeholder: '请选择...',
        formError: true,
        dataSource: [{ label: '管理员', value: 'administrator' }, { label: '投稿者', value: 'contributor' }],
    },
    {
        name: 'type',
        label: '资源分类',
        type: 'select',
        message: '必填',
        placeholder: '请选择...',
        formError: true,
        dataSource: [{ label: '管理员', value: 'administrator' }, { label: '投稿者', value: 'contributor' }],
    },
    {
        name: 'order',
        label: '排序',
        type: 'text',
        message: '必填',
        placeholder: '请输入排序编码',
        formError: true,
    },
    {
        name: 'roleList',
        type: 'tag',
        label: '关联角色',
    },
    {
        name: 'organizationList',
        type: 'tag',
        label: '关联组织',
    },
];

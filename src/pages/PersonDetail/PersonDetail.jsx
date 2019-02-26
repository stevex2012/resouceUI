import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
// 路由
import { withRouter } from 'react-router-dom';
//弹框穿梭框
import { DialogTransfer } from '@components';
//弹框
import { Dialog, Message } from '@alifd/next';
//内容面板
import { InfoView, ViewInfo } from '@modules';
//显示form表单配置
import formConfig from './config.js';

const dataSource = [
    {
        label: `content$1`,
        key: `1`,
        disabled: false,
    },
    {
        label: `content$2`,
        key: `2`,
        disabled: false,
    },
    {
        label: `content$3`,
        key: `3`,
        disabled: false,
    },
    {
        label: `content$4`,
        key: `4`,
        disabled: false,
    },
    {
        label: `content$5`,
        key: `8`,
        disabled: false,
    },
];
const treeData = [
    {
        label: 'Component',
        key: '1',
        children: [
            {
                label: 'Form',
                key: '2',
                children: [
                    {
                        label: 'Input',
                        key: '4',
                    },
                    {
                        label: 'Select',
                        key: '5',
                    },
                ],
            },
            {
                label: 'Display',
                key: '3',
                children: [
                    {
                        label: 'Table',
                        key: '6',
                    },
                ],
            },
        ],
    },
    {
        label: 'Component---234234',
        key: '234234',
    },
    {
        label: 'Component---345346',
        key: '7547',
    },
];
//面板测试数据
const detailTestData = {
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
@withRouter
@inject('personStore')
@observer
class PersonDetail extends Component {
    constructor(props) {
        super(props);
        //用户id
        this.pId = '';
        this.state = {
            visible: false,
            show: false,
            //人员详情信息;
            detailData: {},
            //是否禁用
            isForbidden: 'Y',
        };
    }
    componentDidMount() {
        const { match, personStore } = this.props;
        //url上获取id
        this.pId = match.params.pid;
        //获取人员详情数据
        // personStore.getPersonDetail(this.pId).then((data) => {
        //     if (data && data.data && Number(data.result) === 0) {
        //         //刷新store数据
        //         personStore.setPDetail(data.data);
        //     }
        // });
        setTimeout(() => {
            const { pDetail } = personStore;
            const { userName, sex, pCount, mobile, order, organizationList, roleList } = pDetail;
            const newObj = {
                userName,
                sex,
                pCount,
                mobile,
                order,
                organizationList,
                roleList,
            };
            this.setState({
                detailData: newObj,
            });
        }, 0);
    }
    //获取显示值
    handleOk = (obj) => {
        console.log(obj);
        this.setState({
            visible: false,
            show: false,
        });
    };
    handleModify = () => {
        this.setState({
            visible: true,
        });
    };
    handleShowtree = () => {
        this.setState({
            show: true,
        });
    };
    //返回
    handleGoBack = () => {
        //点击“返回”切换至列表页
        const { history } = this.props;
        history && history.push('/personmanage');
    };
    //编辑人员信息
    handleEdit = () => {
        //点击“编辑”详情页切换至编辑状态 （（（已经停用的可以编辑？）））
        const { history } = this.props;
        history && history.push('/personmanage');
    };
    //启用人员
    handleEnable = () => {
        console.log('启用人员');
        Dialog.confirm({
            title: '启用人员',
            content: '启用该员工的组织关系及角色权限？',
            onOk: () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                }).then(() => {
                    Message.success('Deleted successfully!');
                });
            },
        });
        //弹框先
        // const { personStore } = this.props;
        // const {pDetail,modifyPInfo} = personStore;
        // const postData = Object.assign({},pDetail);
        // //修改启用状态
        // postData.isForbidden = 'Y';
        // modifyPInfo(postData).
    };
    //禁用人员
    handleDisable = () => {
        console.log('禁用人员');
        Dialog.confirm({
            title: '禁用人员',
            content: '停用后，该员工的组织及角色权限将无法正常使用，确认是否停用?',
            onOk: () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                }).then(() => {
                    Message.success('Deleted successfully!');
                });
            },
        });
    };
    //删除
    handleDel = () => {
        const { history } = this.props;
        Dialog.confirm({
            title: '删除人员',
            content: '删除后，该员工的信息将从系统中完全清除',
            onOk: () => {
                return new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                }).then(() => {
                    Message.success('Deleted successfully!');
                    //返回列表页面
                    history && history.push('/personmanage');
                });
            },
        });
    };
    //获取按钮组
    getBtns(isForbidden) {
        const me = this;
        if (isForbidden === 'Y') {
            //已禁用
            return {
                back: me.handleGoBack, //返回
                edit: me.handleEdit, //编辑
                startUsed: me.handleEnable, //启用
                delete: me.handleDel, //删除
            };
        } else {
            //已启用
            return {
                back: me.handleGoBack,
                edit: me.handleEdit,
                stopUsed: me.handleDisable, ////禁用
                delete: me.handleDel,
            };
        }
    }
    //删除员工信息
    render() {
        const { visible, show, detailData, isForbidden } = this.state;
        const me = this;
        return (
            <div className="person-detail-page">
                <ViewInfo title="人员信息">
                    <InfoView
                        data={JSON.parse(JSON.stringify(detailData))}
                        config={formConfig}
                        options={this.getBtns(isForbidden)}
                    />
                </ViewInfo>
                <DialogTransfer
                    title="关联人员"
                    // dataSource={dataSource}
                    dataSource={treeData}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    // tree={false}
                    tree
                />
                <DialogTransfer
                    title="关联组织"
                    dataSource={dataSource}
                    visible={show}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    tree={false}
                />
                人员详情
                <div onClick={this.handleModify}>修改树结构</div>
                <div onClick={this.handleShowtree}>修改</div>
            </div>
        );
    }
}
export default PersonDetail;

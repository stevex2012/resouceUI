import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ViewInfo, InfoForm } from '@modules';
import formConfig from './formConfig.js';

@withRouter
class EditResourceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const me = this;
        const title = '编辑资源信息';
        const data = {
            resourceId: 'r01',
            resourceName: '企业',
            resourceCode: '1001',
            resourcePid: '10',
            type: '分类',
            order: '0',
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
        };
        return (
            <div className="resource-manage-page">
                <ViewInfo title={title}>
                    <InfoForm
                        data={data}
                        config={formConfig}
                        options={{
                            save: me.handleSaveInfo,
                            cancel: me.handleCancelInfo,
                            editroleList: me.handleChangeRoles,
                            editorganizationList: me.handleChangeOrganizations,
                        }}
                    />
                </ViewInfo>
            </div>
        );
    }
    handleSaveInfo = () => {
        const { history } = this.props;
        console.log('动作: ', '保存');
        history.goBack();
    };
    handleCancelInfo = () => {
        const { history } = this.props;
        console.log('动作: ', '取消');
        history.goBack();
    };
    handleChangeRoles = () => {
        console.log('动作: ', '修改角色');
    };
    handleChangeOrganizations = () => {
        console.log('动作: ', '修改组织');
    };
}

export default EditResourceInfo;

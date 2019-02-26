import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ViewInfo, InfoView } from '@modules';
import formConfig from './formConfig.js';
@withRouter
class ResourceManage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const me = this;
        const title = '资源信息';
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
                    <InfoView
                        data={data}
                        config={formConfig}
                        options={{ edit: me.handleEditInfo, delete: me.handleDeleteInfo }}
                    />
                </ViewInfo>
            </div>
        );
    }
    handleEditInfo = () => {
        const { history } = this.props;
        console.log('动作: ', '编辑');
        history.push('/resourcemanage/edit');
    };
    handleDeleteInfo = () => {
        console.log('动作: ', '删除');
    };
}

export default ResourceManage;

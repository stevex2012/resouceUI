import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

const resourceData = [
    {
        index: 1,
        resourceName: '啥啥啥',
        sort: '技术开发',
        resourceNum: '12345678900',
    },
    {
        index: 1,
        resourceName: '啥啥啥',
        sort: '技术开发',
        resourceNum: '12345678900',
    },
    {
        index: 1,
        resourceName: '啥啥啥',
        sort: '技术开发',
        resourceNum: '12345678900',
    },
    {
        index: 1,
        resourceName: '啥啥啥',
        sort: '技术开发',
        resourceNum: '12345678900',
    },
];

export default class ResourceTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
    }
    render() {
        return (
            <IceContainer>
                <Table dataSource={resourceData}>
                    <Table.Column title="" dataIndex="index" />
                    <Table.Column title="资源" dataIndex="resourceName" />
                    <Table.Column title="所属分类" dataIndex="sort" />
                    <Table.Column title="资源编号" dataIndex="resourceNum" />
                </Table>
                <Pagination
                    style={{ marginTop: '20px', textAlign: 'right' }}
                    current={this.state.current}
                    onChange={this.handleChange}
                />
            </IceContainer>
        );
    }
}

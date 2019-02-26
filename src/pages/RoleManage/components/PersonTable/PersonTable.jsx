import React, { Component } from 'react';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container';

const personData = [
    {
        index: 1,
        count: '1111111',
        name: '小太阳',
        phone: '12345678900',
        position: '员工',
    },
    {
        index: 1,
        count: '1111111',
        name: '小太阳',
        phone: '12345678900',
        position: '员工',
    },
    {
        index: 1,
        count: '1111111',
        name: '小太阳',
        phone: '12345678900',
        position: '员工',
    },
    {
        index: 1,
        count: '1111111',
        name: '小太阳',
        phone: '12345678900',
        position: '员工',
    },
];

export default class PersonTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
    }
    render() {
        return (
            <IceContainer>
                <Table dataSource={personData}>
                    <Table.Column title="" dataIndex="index" />
                    <Table.Column title="用户账户" dataIndex="count" />
                    <Table.Column title="姓名" dataIndex="name" />
                    <Table.Column title="手机号" dataIndex="phone" />
                    <Table.Column title="职务" dataIndex="position" />
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

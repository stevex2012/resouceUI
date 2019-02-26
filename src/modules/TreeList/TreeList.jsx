import React, { Component } from 'react';
import { Tree } from '@alifd/next';
import PropTypes from 'prop-types';

class Treelist extends Component {
    constructor(props) {
        super(props);
        const fakeData = [
            {
                organizationId: 'a',
                organizationName: '测试啊a',
                organization: [
                    {
                        organizationName: '测试啊',
                        organization: [
                            {
                                organizationName: '测试啊aaa',
                                organization: [],
                                organizationId: 'aaa',
                            },
                            {
                                organizationName: '测试啊aab',
                                organization: [],
                                organizationId: 'aab',
                            },
                        ],
                        organizationId: 'aa',
                    },
                    {
                        organizationName: '测试啊ab',
                        organization: [],
                        organizationId: 'ab',
                    },
                ],
            },
            {
                organizationName: '测试啊b',
                organization: [],
                organizationId: 'b',
            },
        ];

        const { data, type } = this.props;
        this.type = type || 'organization';
        this.dataSource = this.recombine(data || fakeData);
    }
    /**
     * @description 重组数组
     * @author Penny
     * @param {any} data 数组
     * @returns Tree需要的结构数组
     * @memberof Treelist
     */
    recombine = (data) => {
        const newArray = [];
        data.forEach((item) => {
            // this.recombine(item[`${this.type}`]);
            const obj = {};
            obj.label = item[`${this.type}Name`];
            obj.key = item[`${this.type}Id`];
            if (item[`${this.type}`] && item[`${this.type}`].length > 0) {
                // obj.children = [];
                obj.children = this.recombine(item[`${this.type}`]);
            }
            newArray.push(obj);
        });
        return newArray;
    };
    handleSelect = (key, info) => {
        console.log(info);
        const { onSelect } = this.props;
        onSelect && onSelect(info);
    };
    render() {
        return <Tree defaultExpandAll onSelect={this.handleSelect} dataSource={this.dataSource} />;
    }
}
PropTypes.Treelist = {
    //设置显示的树形数据,不用做处理，我这边统一已处理
    data: PropTypes.array,
    // 点击事件
    onSelect: PropTypes.func,
    //类型，目前只有两种：resource（资源）、organization（组织）、role(角色)
    type: PropTypes.string,
};
export default Treelist;

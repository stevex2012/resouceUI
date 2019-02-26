import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';
//引入莫泰框,穿梭框
import { Transfer, Search, Tree, Button, Checkbox } from '@alifd/next';
//树节点
const TreeNode = Tree.Node;

// 0-0-0-1

class Content extends Component {
    constructor() {
        super();
        this.state = {
            //选中树节点
            checkedKeys: [],
            //树结构，右侧选中信息
            rightTreeList: [],
            //保存 树结构右侧选中信息
            checkTreeRightKeys: [],
            //默认展开的节点
            expandedKeys: [],
            //右侧搜索值
        };
    }
    //保存选中树节点位置信息
    checkTreePos = [];
    //统一修改入口
    setCheckTreePos(pos) {
        this.checkTreePos = pos;
    }
    //保存左侧所有列表
    matchedKeys = [];
    setMatchedKeys(keys) {
        this.matchedKeys = keys;
    }
    //保存右侧列表树结构List,针对数结构，右侧显示列表,
    rightTreeListOriginData = [];
    setRightTreeListOriginData(list) {
        this.rightTreeListOriginData = list;
    }
    handleChange = (value, data, extra) => {
        this.doChange(value);
    };
    //处理左右数据变换
    doChange(data) {
        const { onChange } = this.props;
        onChange && onChange(data);
    }
    //没有相关搜索
    notFoundContent() {
        return '没有相关信息';
    }
    //选中数节点
    handleCheck = (keys, extra) => {
        //保存选中树节点位置信息
        const { checkedNodesPositions } = extra;
        //pos 保存形式 "0-0-0-0";
        this.setCheckTreePos(checkedNodesPositions.map((item) => item.pos));
        this.setState({
            checkedKeys: keys,
        });
    };
    //移动选中树结构数据
    handleMoveTreeData = () => {
        const { checkedKeys } = this.state;
        //根据树结构，获取选中节点，的扁平结构
        const flatList = this.getRightTreeList(this.checkTreePos);
        this.setRightTreeListOriginData(flatList);
        this.setState({
            rightTreeList: flatList,
        });
        //触发回调
        this.doChange(checkedKeys);
    };
    //移动右侧列表数据选中树结构数据
    handleReBackTreeData = () => {
        //右侧列表
        const { rightTreeList, checkTreeRightKeys } = this.state;
        const oldListData = this.rightTreeListOriginData;
        const newRightOrigindata = oldListData.filter((item) => !checkTreeRightKeys.includes(item.key));
        this.setRightTreeListOriginData(newRightOrigindata);
        // const newList = rightTreeList.filter((item) => !checkTreeRightKeys.includes(item.key));
        const newList = [];
        //右侧剩下的数据
        const leftKeys = [];
        rightTreeList.forEach((item) => {
            if (!checkTreeRightKeys.includes(item.key)) {
                newList.push(item);
                leftKeys.push(item.key);
            }
        });
        //更新右侧列表
        this.setState({
            rightTreeList: newList,
            checkTreeRightKeys: [],
        });
        //触发回调
        this.doChange(leftKeys);
    };
    //选中右侧树结构
    handleChooseRightNode = (checkedKeys) => {
        this.setState({
            checkTreeRightKeys: checkedKeys,
        });
        //保存右侧选中树key
    };
    //搜索左侧数结构
    handleSearchLeft = (val) => {
        const { dataSource } = this.props;
        const value = val.trim();
        if (!value) {
            this.setMatchedKeys([]);
            this.setState({
                expandedKeys: [],
            });
            return;
        }
        //
        const newMatchKeys = [];
        const loop = (data) =>
            data.forEach((item) => {
                if (item.label.indexOf(value) > -1) {
                    newMatchKeys.push(item.key);
                }
                if (item.children && item.children.length) {
                    loop(item.children);
                }
            });
        loop(dataSource);
        this.setState({
            expandedKeys: [...newMatchKeys],
        });
        this.matchedKeys = newMatchKeys;
    };
    //搜索右侧类表 (树结构)
    handleSearchRight = (val) => {
        //左侧选中节点基础值
        const value = val.trim();
        const baseList = this.rightTreeListOriginData;
        if (!value) {
            this.setState({
                rightTreeList: baseList,
            });
            return;
        }
        const newList = baseList.filter((item) => item.label.indexOf(value) > -1);
        this.setState({
            rightTreeList: newList,
        });
    };
    //展开树结构
    hanleExpandTree = (keys) => {
        this.setState({
            expandedKeys: keys,
        });
    };
    //右侧全部选中
    handleCheckAllRightKeys = () => {
        const { checkTreeRightKeys } = this.state;
        let newKeys = '';
        //取消
        if (checkTreeRightKeys.length === this.rightTreeListOriginData.length) {
            newKeys = [];
        } else {
            //全选
            newKeys = this.rightTreeListOriginData.map((item) => item.key);
        }
        this.setState({
            checkTreeRightKeys: newKeys,
        });
    };
    //获取右侧新的列表信息
    getRightTreeList(checkTreePos) {
        if (!checkTreePos.length) return [];
        return checkTreePos.map((item) => {
            return this.getTreeNodeMsg(item);
        });
    }
    //根据树节点获取每个节点信息
    getTreeNodeMsg(nodeMsg) {
        if (!nodeMsg) return;
        const { dataSource } = this.props;
        //分割节点位置信息
        const posArr = nodeMsg.split('-');
        //存储 key
        let keyVal = '';
        //存储文字
        let labelTxt = '';
        let children = '';
        //迭代数据
        let literatorData = dataSource;
        for (let i = 1; i < posArr.length; i++) {
            if (!literatorData) break;
            //节点位置
            const idx = posArr[i];
            const { label, key, children } = literatorData[idx];
            labelTxt = labelTxt ? `${label}/${labelTxt}` : `${label}`;
            //是否最后
            if (i === posArr.length - 1) {
                keyVal = key;
                break;
            } else {
                literatorData = children;
            }
        }
        return {
            key: keyVal,
            label: labelTxt,
        };
    }
    //渲染数节点
    renderTreeNode(data) {
        return data.map((item) => {
            const { key, label, children } = item;
            //已选中节点 && 节点被移动到右侧，这个节点disabled
            // const { rightTreeList } = this.state;
            const rightTreeList = this.rightTreeListOriginData;
            const disabled = rightTreeList.some((item) => item.key === key);
            return (
                <TreeNode key={key} label={label} checkboxDisabled={disabled}>
                    {children && this.renderTreeNode(children)}
                </TreeNode>
            );
        });
    }
    //渲染树结构
    renderTree() {
        const { checkedKeys, rightTreeList, checkTreeRightKeys, expandedKeys } = this.state;
        const { dataSource } = this.props;
        const filterTreeNode = (node) => {
            return this.matchedKeys && this.matchedKeys.indexOf(node.props.eventKey) > -1;
        };
        return (
            <div className={styles.box}>
                {/* 左侧面板 */}
                <div className={styles.panel}>
                    <Search
                        shape="simple"
                        size="medium"
                        style={{ width: '193px', marginBottom: '10px' }}
                        onChange={this.handleSearchLeft}
                    />
                    <div className={styles.wrap}>
                        <Tree
                            checkedKeys={checkedKeys}
                            //选中所有子节点，是否自动选中父节点
                            checkStrictly
                            onCheck={this.handleCheck}
                            expandedKeys={expandedKeys}
                            onExpand={this.hanleExpandTree}
                            filterTreeNode={filterTreeNode}
                            checkable
                        >
                            {this.renderTreeNode(dataSource)}
                        </Tree>
                    </div>
                </div>
                {/* 中间按钮 */}
                {this.renderMidBtns(checkedKeys, checkTreeRightKeys, this.rightTreeListOriginData)}
                {/* 右侧面板 */}
                <div className={styles.panel}>
                    <Search
                        shape="simple"
                        size="medium"
                        style={{ width: '193px', marginBottom: '10px' }}
                        onChange={this.handleSearchRight}
                    />
                    <div className={`${styles.wrap} ${styles.rightW}`}>
                        {this.renderTreeRightList(rightTreeList, checkTreeRightKeys)}
                    </div>
                    {/* 底部全选按钮 */}
                    {this.renderRightAllCheck(checkTreeRightKeys, this.rightTreeListOriginData)}
                </div>
            </div>
        );
    }
    //渲染右侧面板列表
    renderTreeRightList(list, checkList) {
        if (!list || !list.length) return '';
        const listItems = list.map((item) => {
            const { label, key } = item;
            return (
                //处理选中右侧树
                <Checkbox value={key} key={key} className={`${styles.checkItem}`}>
                    {label}
                </Checkbox>
            );
        });
        //垂直显示复选框
        return (
            <Checkbox.Group itemDirection="ver" onChange={this.handleChooseRightNode} value={checkList}>
                {listItems}
            </Checkbox.Group>
        );
    }
    //渲染右侧底部全选
    renderRightAllCheck(checkTreeRightKeys, rightTreeListOriginData) {
        let txt = '';
        if (!checkTreeRightKeys.length) {
            txt = `${rightTreeListOriginData.length}项`;
        } else {
            txt = `${checkTreeRightKeys.length}/${rightTreeListOriginData.length}项`;
        }
        const isChecked = !!checkTreeRightKeys.length && checkTreeRightKeys.length === rightTreeListOriginData.length;
        return (
            <div className={`${styles.rightAllCheck}`}>
                <Checkbox onChange={this.handleCheckAllRightKeys} checked={isChecked}>
                    {txt}
                </Checkbox>
            </div>
        );
    }
    //渲染按钮
    renderMidBtns(checkedKeys, checkTreeRightKeys, rightTreeListOriginData) {
        //左侧选中，keys 和右侧选中key求 差集; 右侧是左侧的子集
        const leftType = checkedKeys.length > rightTreeListOriginData.length ? 'primary' : 'normal';
        const leftDisabled = !(checkedKeys.length > rightTreeListOriginData.length);
        return (
            <div className={styles.operations}>
                <Button
                    onClick={this.handleMoveTreeData}
                    className={`${styles.transformBtn}`}
                    type={leftType}
                    disabled={leftDisabled}
                >
                    {'>'}
                </Button>
                <Button
                    onClick={this.handleReBackTreeData}
                    className={`${styles.transformBtn}`}
                    type={checkTreeRightKeys.length ? 'primary' : 'normal'}
                    disabled={!checkTreeRightKeys.length}
                >
                    {'<'}
                </Button>
            </div>
        );
    }
    //转换数据格式
    transfromData(data) {
        data.forEach((item) => {
            item.value = item.key;
        });
        return data;
    }
    //渲染列表
    renderList() {
        const { dataSource, showSearch, defaultValue } = this.props;
        return (
            <Transfer
                dataSource={this.transfromData(dataSource)}
                titles={['', '']}
                showSearch={showSearch}
                onChange={this.handleChange}
                defaultValue={defaultValue}
                notFoundContent={this.notFoundContent()}
            />
        );
    }
    render() {
        const { tree } = this.props;
        return tree ? this.renderTree() : this.renderList();
    }
}
Content.propTypes = {
    tree: PropTypes.bool.isRequired, //是否树结构
    dataSource: PropTypes.array.isRequired, //数据结构
    showSearch: PropTypes.bool, //显示搜素
    onChange: PropTypes.func, //左右数据发生改变时候触发
    defaultValue: PropTypes.array, //右侧面板 初始值;
};
export default Content;

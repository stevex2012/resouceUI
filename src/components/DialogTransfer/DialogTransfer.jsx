import React, { Component } from 'react';
import PropTypes from 'prop-types';
//引入莫泰框,穿梭框
import { Dialog } from '@alifd/next';
//内容组件
import Content from './Content';

class DialogTransfer extends Component {
    //一个对象来保存左右面板发生改变的时候，记录数据
    msgChangeObj = {};
    //赋值记录数据对象
    setMsgChangeObj(data) {
        this.msgChangeObj = data;
    }
    //记录最后一次数据变化
    handleCg = (data) => {
        this.setMsgChangeObj({
            data: data,
        });
    };
    //确定
    handleOk = () => {
        new Promise((resolve, reject) => {
            this.props.onOk && this.props.onOk(this.msgChangeObj);
            resolve(1);
        }).then(() => {
            this.setMsgChangeObj({});
        });
    };
    //取消
    handleCancel = () => {
        new Promise((resolve, reject) => {
            this.props.onCancel && this.props.onCancel(this.msgChangeObj);
            resolve(1);
        }).then(() => {
            this.setMsgChangeObj({});
        });
    };
    //关闭
    handleClose = () => {
        new Promise((resolve, reject) => {
            this.props.onClose && this.props.onClose(this.msgChangeObj);
            resolve(1);
        }).then(() => {
            this.setMsgChangeObj({});
        });
    };
    render() {
        const { visible, title, footerAlign, showSearch, dataSource, tree, defaultValue } = this.props;
        return (
            <Dialog
                title={title}
                visible={visible}
                footerAlign={footerAlign}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                onClose={this.handleClose}
            >
                <Content
                    dataSource={dataSource}
                    tree={tree}
                    showSearch={showSearch}
                    onChange={this.handleCg}
                    defaultValue={defaultValue}
                />
            </Dialog>
        );
    }
}
DialogTransfer.defaultProps = {
    footerAlign: 'center',
    showSearch: true,
    defaultValue: [],
};
DialogTransfer.propTypes = {
    title: PropTypes.node, //标题
    visible: PropTypes.bool.isRequired, //是否显示,
    onOk: PropTypes.func, //点击确定
    onCancel: PropTypes.func, //点击取消
    onClose: PropTypes.func, //关闭回调D
    footerAlign: PropTypes.string, //底部按钮的对齐方式 left', 'center', 'right'
    //下面参数为content组件需要
    dataSource: PropTypes.array.isRequired, //渲染数据[{key:'',label:'',disabled:bool}]
    tree: PropTypes.bool.isRequired, //是否树结构
    showSearch: PropTypes.bool, //显示搜素
    defaultValue: PropTypes.array, //右侧面板 初始值;
};
export default DialogTransfer;

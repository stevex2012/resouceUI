import React from 'react';
import { Grid, Button } from '@components';
import optionsMap from '../optionsMap';

const { Row, Col } = Grid;

// 表单的相关操作项
// 表单子项的容器
export const formItemWrap = (label, reactNode) => {
    return (
        <Row style={styles.formItem} key={label}>
            <Col xxs="6" s="3" l="3" style={styles.formLabel}>
                {label}
            </Col>
            <Col s="21" l="18">
                {reactNode}
            </Col>
        </Row>
    );
};

// 页面的按钮渲染
export const optionRender = (options) => {
    const tKeys = Object.keys(options);
    const tOptionsKeys = Object.keys(optionsMap);
    const tNode = tKeys.map((key) => {
        if (tOptionsKeys.includes(key)) {
            return (
                <Button key={key} onClick={options[key]} style={{ marginRight: '10px' }}>
                    {optionsMap[key]}
                </Button>
            );
        } else {
            console.log(key, '不存在于optionsMap中, 请在optionsMap中添加。');
            return <React.Fragment key={key} />;
        }
    });

    return <div style={styles.infoOptions}>{tNode}</div>;
};

const styles = {
    infoOptions: {
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '1px solid #eee',
    },
    formItem: {
        marginBottom: 25,
    },
    formLabel: {
        height: '32px',
        lineHeight: '32px',
        textAlign: 'right',
    },
    formTitle: {
        margin: '0 0 20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
    },
};

/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { formItemWrap, optionRender, tagGroup } from './components';

const renderDomCalc = (data, config) => {
    const tKeys = Object.keys(data);
    const tData = tKeys.map((key) => {
        let tConfigItem = {};
        for (let i = 0; i < config.length; i++) {
            if (config[i].name === key) {
                tConfigItem = config[i];
                break;
            }
        }
        return { key: tConfigItem.name, label: tConfigItem.label, value: data[key] };
    });

    return tData.map((item) => {
        return formItem(item);
    });
};

const InfoView = ({ data, config, options }) => {
    return (
        <div className="user-form">
            {optionRender(options)}
            <div style={styles.formContent}>{renderDomCalc(data, config)}</div>
        </div>
    );
};

InfoView.displayName = 'InfoView';
InfoView.propTypes = {};
InfoView.defaultProps = {};

const formItem = (data) => {
    const { label, value, key } = data;
    let tNode = null;
    if (Array.isArray(value)) {
        tNode = tagGroup(data);
    } else {
        tNode = <div style={{ lineHeight: '32px' }}>{value}</div>;
    }

    return <div key={key}>{formItemWrap(`${label}：`, tNode)}</div>;
};

export default InfoView;

const styles = {
    formContent: {
        width: '100%',
        position: 'relative',
    },
};

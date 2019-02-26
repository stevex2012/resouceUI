/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Input, Select, Radio, Checkbox, IceFormBinderWrapper, IceFormBinder, IceFormError } from '@components';
import { formItemWrap, optionRender, tagGroup } from './components';

const { Group: RadioGroup } = Radio;
const { Group: CheckboxGroup } = Checkbox;

export default class InfoForm extends Component {
    static displayName = 'InfoForm';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        const { data } = props;
        this.state = {
            value: {
                ...data,
            },
        };
    }

    handleChangeTag = (tagGroupName, idKey, tagId) => {
        console.log(`关闭tag ${tagId}`);
        const { value } = this.state;
        const tTagsData = [...value[tagGroupName]];
        const tIndex = tTagsData.findIndex((tag) => {
            return tag[idKey] === tagId;
        });
        tTagsData.splice(tIndex, 1);
        this.setState({
            value: Object.assign({}, value, { [tagGroupName]: tTagsData }),
        });
    };

    formChange = (value) => {
        this.setState({
            value,
        });
    };

    validateAllFormField = () => {
        const { validateAll } = this.refs.form;
        const { options } = this.props;
        validateAll((errors, values) => {
            console.log('values', values);
            console.log('errors', errors);
            options && options.save && options.save(this.state.value);
        });
    };

    renderDomCalc = (data, config, options) => {
        const tKeys = Object.keys(data);
        const tData = tKeys.map((key) => {
            let tConfigItem = {};
            for (let i = 0; i < config.length; i++) {
                if (config[i].name === key) {
                    tConfigItem = config[i];
                    break;
                }
            }
            return Object.assign({}, tConfigItem, {
                value: data[key],
            });
        });

        return tData.map((item) => {
            return formItem(item, options);
        });
    };

    render() {
        const { config, options } = this.props;
        const { editroleList, editorganizationList } = options;
        const { value } = this.state;
        return (
            <div className="user-form">
                <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
                    {optionRender(Object.assign({}, options, { save: this.validateAllFormField }))}
                    <div style={styles.formContent}>
                        {this.renderDomCalc(value, config, {
                            tagChange: this.handleChangeTag,
                            editroleList,
                            editorganizationList,
                        })}
                    </div>
                </IceFormBinderWrapper>
            </div>
        );
    }
}

const formItem = (data, options) => {
    const {
        type,
        name,
        label,
        formError,
        required,
        message,
        size,
        readOnly = false,
        placeholder,
        dataSource,
        validator,
        style = { minWidth: '40em', width: '40%' },
    } = data;
    const formBinderProps = { name, required, message, validator };
    const inputProps = { size, placeholder, style, readOnly };
    const selectProps = { size, placeholder, style, dataSource, readOnly };
    const radioProps = { dataSource };
    const checkboxProps = { dataSource };

    let renderNode = null;

    switch (type) {
        case 'select': {
            renderNode = <Select {...selectProps} />;
            break;
        }
        case 'checkbox': {
            renderNode = <CheckboxGroup {...checkboxProps} />;
            break;
        }
        case 'radio': {
            renderNode = <RadioGroup {...radioProps} />;
            break;
        }
        case 'tag': {
            renderNode = tagGroup(data, 'edit', options);
            break;
        }
        case 'text':
        case 'email':
        default: {
            renderNode = <Input {...inputProps} />;
        }
    }

    return (
        <div key={name}>
            {formItemWrap(
                `${label}：`,
                <div style={styles.formValue}>
                    <IceFormBinder {...formBinderProps}>{renderNode}</IceFormBinder>
                    {formError && <IceFormError name={name} />}
                </div>
            )}
        </div>
    );
};

const styles = {
    formContent: {
        width: '100%',
        position: 'relative',
    },
    formValue: {
        paddingTop: '2px',
    },
};

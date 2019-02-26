/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Message } from '@components';

@withRouter
class UserLogin extends Component {
    static displayName = 'UserLogin';

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.container}>
                <h4 style={styles.title}>登 录</h4>
                <div style={styles.formItems}>
                    <div style={styles.footer}>
                        <Button type="primary" size="large" onClick={this.handleSubmit} style={styles.submitBtn}>
                            企业微信登录
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        width: '360px',
        padding: '40px',
        background: '#fff',
        borderRadius: '6px',
        zIndex: 9,
    },
    title: {
        margin: '0 0 40px',
        color: 'rgba(0, 0, 0, 0.8)',
        fontSize: '28px',
        fontWeight: '500',
        textAlign: 'center',
    },
    footer: {
        textAlign: 'center',
    },
    submitBtn: {
        width: '12em',
    },
    tips: {
        marginTop: '20px',
        display: 'block',
        textAlign: 'center',
    },
};

export default UserLogin;

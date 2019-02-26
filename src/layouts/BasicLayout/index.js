import React, { Component } from 'react';
import cx from 'classnames';
import Layout from '@icedesign/layout';
import { Icon } from '@components';
import MainRoutes from './MainRoutes';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import './index.scss';

const theme = 'dark';

export default class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: props.collapse,
        };
    }
    render() {
        const { collapse } = this.state;
        return (
            <Layout fixable style={{ minHeight: '100vh' }} className={cx(`basic-layout-${theme} ice-design-layout`)}>
                <Header theme={theme} />

                <Layout.Section>
                    <Layout.Aside
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: collapse ? '40px' : '300px',
                            flexShrink: 0,
                            overflow: 'hidden',
                        }}
                    >
                        <Aside />
                        <a className="collapse-btn" onClick={this.toggleCollapse}>
                            <Icon type={collapse ? 'arrow-right' : 'arrow-left'} size="small" />
                        </a>
                    </Layout.Aside>

                    <Layout.Main scrollable>
                        <MainRoutes />
                        <Footer />
                    </Layout.Main>
                </Layout.Section>
            </Layout>
        );
    }
    /**
     * 左侧菜单收缩切换
     */
    toggleCollapse = () => {
        const { collapse } = this.state;
        this.setState({
            collapse: !collapse,
        });
    };
}

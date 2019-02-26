import React, { PureComponent } from 'react';
import Layout from '@icedesign/layout';
import cx from 'classnames';
import './Footer.scss';

class Footer extends PureComponent {
    render() {
        const { className, style } = this.props;
        return (
            <Layout.Footer
                type={null}
                className={cx('ice-design-layout-footer', className)}
                style={{
                    ...style,
                    lineHeight: '36px',
                }}
            >
                <div className="ice-design-layout-footer-body">
                    <div style={{ filter: 'grayscale(100%)', opacity: 0.3 }}>
                        {/* <Logo style={{ color: '#666' }} /> */}
                    </div>
                    <div className="copyright">车和美 © 2019 版权所有</div>
                </div>
            </Layout.Footer>
        );
    }
}

export default Footer;

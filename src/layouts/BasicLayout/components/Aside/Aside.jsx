/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TreeList } from '@modules';
import './Aside.scss';

@withRouter
class BasicLayout extends Component {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        const { location } = this.props;
        const { pathname } = location;

        return (
            <div style={{ flex: 1, overflowX: 'hidden', padding: '20px' }}>
                <TreeList pathname={pathname} />
            </div>
        );
    }
}

export default BasicLayout;

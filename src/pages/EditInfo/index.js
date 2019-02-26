import React, { Component } from 'react';
import { TreeList } from '@modules';

export default class EditInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="edit-info-page">
                <TreeList />
            </div>
        );
    }
}

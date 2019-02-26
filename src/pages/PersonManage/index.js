import React, { Component } from 'react';
import SelectableTable from './components/SelectableTable';

export default class PersonManage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="person-manage-page">
                <SelectableTable />
            </div>
        );
    }
}

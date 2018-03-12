import React, { Component } from 'react';
import ReactDisqusThread from './ReactDisqusThread';

export default class DisqusThreadContainer extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <ReactDisqusThread {...this.props} />
        );
    }
}

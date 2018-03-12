import React, { Component } from 'react';

export default class StyleButton extends Component {
    onToggle(e) {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }
    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.onToggle} role="presentation">
                {this.props.label}
            </span>
        );
    }
}

import React from 'react';

export default ({ style, label, onToggle, active }) => {
    const _onToggle = (e) => {
        e.preventDefault();
        onToggle(style);
    }

    let className = 'RichEditor-styleButton';
    if (active) {
        className += ' RichEditor-activeButton';
    }
    return (
        <span className={className} onMouseDown={_onToggle} role="presentation">
            {label}
        </span>
    );
}

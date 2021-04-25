import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Notice = React.forwardRef((props: any, ref: any) => {
    const onClick = () => {
        alert("123");
    }
    return (
        <button ref={ref} onClick={onClick}>
            test123
            {props.children}
        </button >
    );
});

export default Notice;
import React from 'react';
import './TopMenu.css';
import BEMHelper from 'react-bem-helper';

const classes = new BEMHelper({
    name: 'top-menu',
});

export const TopMenu: React.FC = () => {
    return (
        <nav {...classes()}>
            <div {...classes('item')}>Language</div>
            <div className="vl"/>
            <div {...classes('item')}>Login</div>
            <div className="vl"/>
            <div {...classes('item')}>Register</div>
        </nav>
    )
};

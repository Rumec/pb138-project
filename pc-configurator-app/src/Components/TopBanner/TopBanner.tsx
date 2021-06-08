import React from 'react';
import './TopBanner.css';
import ShoppingCart from './images/cart.svg';
import BEMHelper from 'react-bem-helper';

interface ITopBannerProps {
    header: string
}

const classes = new BEMHelper({
    name: 'top-banner',
});

export const TopBanner: React.FC<ITopBannerProps> = (props: ITopBannerProps) => {
    return (
        <nav {...classes()}>
            <div {...classes('header')}>
                {props.header}
            </div>
            <img {...classes('icon')} src={ShoppingCart} alt={'Shopping cart.'}/>
        </nav>
    )
};

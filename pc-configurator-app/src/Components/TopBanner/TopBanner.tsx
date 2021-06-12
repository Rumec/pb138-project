import React from 'react';
import './TopBanner.css';
import ShoppingCart from './images/cart.svg';
import BEMHelper from 'react-bem-helper';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand
  } from 'reactstrap';

interface ITopBannerProps {
    header: string
}

const classes = new BEMHelper({
    name: 'top-banner',
});

export const TopBanner: React.FC<ITopBannerProps> = (props: ITopBannerProps) => {
    return (
        <Navbar {...classes()}  light expand="md">
            <NavbarBrand className="mr-auto">
                    <h1 className="top-Banner__name">{props.header}</h1>
                </NavbarBrand>
            <Nav navbar>
                
                <NavItem>
                    <NavLink href="#"><img {...classes('icon')} src={ShoppingCart} alt={'Shopping cart.'}/></NavLink>
                </NavItem>
            </Nav>
        </Navbar>
        
    )
};

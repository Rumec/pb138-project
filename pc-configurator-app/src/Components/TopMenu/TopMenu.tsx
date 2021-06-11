import React from 'react';
import './TopMenu.css';
import BEMHelper from 'react-bem-helper';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand
  } from 'reactstrap';

const classes = new BEMHelper({
    name: 'top-menu',
});

export const TopMenu: React.FC = () => {
    return (
        <Navbar {...classes()} color="light" light expand="md">
            <NavbarBrand className="mr-auto">SomeText</NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink href="#">Language</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Register</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
};

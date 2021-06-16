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
        <Navbar {...classes()} expand="md">
            <NavbarBrand className="mr-auto">
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/type" class="navBar__text">Home</NavLink>
                    </NavItem>
                </Nav>
            </NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink href="#" class="navBar__text">Language</NavLink>
                </NavItem>
                <span className="navBar__text">|</span>
                <NavItem>
                    <NavLink href="/login" class="navBar__text">Login</NavLink>
                </NavItem>
                <span className="navBar__text">|</span>
                <NavItem>
                    <NavLink href="/register" class="navBar__text">Register</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
};

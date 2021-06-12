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
        <Navbar {...classes()} light expand="md">
            <NavbarBrand className="mr-auto">
                <Nav navbar>
                    <NavItem>
                        <NavLink href="#" class="navBar__text">Home</NavLink>
                    </NavItem>
                    <span>|</span>
                    <NavItem>
                        <NavLink href="#">Office</NavLink>
                    </NavItem>
                    <span>|</span>
                    <NavItem>
                        <NavLink href="#">Gaming</NavLink>
                    </NavItem>
                    <span>|</span>
                    <NavItem>
                        <NavLink href="#">Working</NavLink>
                    </NavItem>
                    <span>|</span>
                    <NavItem>
                        <NavLink href="#">Highend</NavLink>
                    </NavItem>
                    <span>|</span>
                    <NavItem>
                        <NavLink href="#">Own Configuration</NavLink>
                    </NavItem>
                </Nav>
            </NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink href="#">Language</NavLink>
                </NavItem>
                <span>|</span>
                <NavItem>
                    <NavLink href="#">Login</NavLink>
                </NavItem>
                <span>|</span>
                <NavItem>
                    <NavLink href="#">Register</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
};

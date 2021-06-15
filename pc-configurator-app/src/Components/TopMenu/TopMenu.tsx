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
                        <NavLink href="/type" class="navBar__text">Home</NavLink>
                    </NavItem>
                    <span className="navBar__text">|</span>
                    <NavItem>
                        <NavLink href="/specificCategory" class="navBar__text" >Office</NavLink>
                    </NavItem>
                    <span className="navBar__text">|</span>
                    <NavItem>
                        <NavLink href="/specificCategory" class="navBar__text">Gaming</NavLink>
                    </NavItem>
                    <span className="navBar__text">|</span>
                    <NavItem>
                        <NavLink href="/specificCategory" class="navBar__text">Working</NavLink>
                    </NavItem>
                    <span className="navBar__text">|</span>
                    <NavItem>
                        <NavLink href="/specificCategory" class="navBar__text">Highend</NavLink>
                    </NavItem>
                    <span className="navBar__text">|</span>
                    <NavItem>
                        <NavLink href="/ComponentSelector" class="navBar__text">Own Configuration</NavLink>
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

import React from 'react';

import BEMHelper from 'react-bem-helper';
import {useHistory} from "react-router-dom";
import {Button} from "reactstrap";
import "./TopMenu.css";

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
    const history = useHistory();
    return (
        <Navbar {...classes()} expand="md">
            <NavbarBrand className="mr-auto">
                <Nav navbar>
                    <NavItem>
                        <NavLink onClick={() => {history.push("/type")}} class="navBar__text">Home</NavLink>
                    </NavItem>
                </Nav>
            </NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink onClick={() => {history.push("/History")}} class="navBar__text">Order History</NavLink>
                </NavItem>
                <span className="navBar__text">|</span>
                <NavItem>
                    <NavLink onClick={() => {history.push("/login")}} class="navBar__text">Login</NavLink>
                </NavItem>
                <span className="navBar__text">|</span>
                <NavItem>
                    <NavLink onClick={() => {history.push("/register")}} class="navBar__text">Register</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
};

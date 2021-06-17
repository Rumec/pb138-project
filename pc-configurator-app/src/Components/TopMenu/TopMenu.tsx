import React from 'react';

import BEMHelper from 'react-bem-helper';
import {useHistory} from "react-router-dom";
import {defaultUserState} from "../../store/atoms";
import "./TopMenu.css";

import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand
  } from 'reactstrap';
import {useRecoilState} from "recoil";
import {userState} from "../../store/atoms";

const classes = new BEMHelper({
    name: 'top-menu',
});

export const TopMenu: React.FC = () => {
    const [userInformation, setUserInformation] = useRecoilState(userState);
    const history = useHistory();

    const logInLogOut = () => {
        if (userInformation.data.id !== -1) {
            setUserInformation(defaultUserState);
        }
        history.push("/login");
    }

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
                    <NavLink onClick={logInLogOut} class="navBar__text">{(userInformation.data.id === -1)?"Login" : "Logout"}</NavLink>
                </NavItem>
                <span className="navBar__text">|</span>
                <NavItem>
                    <NavLink onClick={() => {history.push("/register")}} class="navBar__text">Register</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )
};

import React, {useState} from 'react';
import './UserRegistration.css';
import BEMHelper from 'react-bem-helper';
import {Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import {useRecoilSnapshot, useRecoilState} from "recoil";
import {userState} from '../../store/atoms';
import { useHistory } from "react-router-dom";

const classes = new BEMHelper({
    name: 'registration',
});


export const UserRegistration: React.FC = () => {
    let history = useHistory();
    const [registrationInfo, setRegistrationInfo] = useState({
        login: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = (event: any) => {
        setRegistrationInfo({
            ...registrationInfo,
            [event.target.name]: event.target.value
        });
    }

    /**
     * Sets user information as global state (using recoil) - see ../../store/atoms.ts
     */
    const registration = () => {
        // Checking if passwords are the same
        if (registrationInfo.password !== registrationInfo.passwordConfirm) {
            console.log(`${registrationInfo.password}, ${registrationInfo.passwordConfirm}`)
            window.alert("Passwords do not match!");
            return;
        }
        // Sends POST to backend and checks if can log in
        const registrationData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationInfo)
        }
        

        fetch('http://localhost:5000/api/user/registration', registrationData)
            .catch(err => {
                window.alert('There was an error!\n' + err);
            });
        history.push("/login")
    }

    return (
        <Col {...classes()}>
            <Row {...classes('line')}>
                <InputGroup {...classes('inputgroup')}>
                    <InputGroupAddon addonType={'prepend'}>
                        <InputGroupText {...classes('inputgroup-text')}>
                            Login:
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        name={'login'}
                        placeholder={'Enter your login'}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Row>
            <Row {...classes('line')}>
                <InputGroup {...classes('inputgroup')}>
                    <InputGroupAddon addonType={'prepend'}>
                        <InputGroupText {...classes('inputgroup-text')}>
                            Password:
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        name={'password'}
                        type={'password'}
                        placeholder={'Enter your password'}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Row>
            <Row {...classes('line')}>
                <InputGroup {...classes('inputgroup')}>
                    <InputGroupAddon addonType={'prepend'}>
                        <InputGroupText {...classes('inputgroup-text')}>
                            Confirm password:
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        name={'passwordConfirm'}
                        type={'password'}
                        placeholder={'Confirm your password'}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Row>
            <Row {...classes('line')}>
                <Button {...classes('inputgroup')}
                        onClick={registration}
                >
                    Sign up
                </Button>
            </Row>
        </Col>
    )
};

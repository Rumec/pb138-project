import React, {useState} from 'react';
import './LoginPage.css';
import BEMHelper from 'react-bem-helper';
import {Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";


const classes = new BEMHelper({
    name: 'login',
});


export const LoginPage: React.FC = () => {

    const [loginInfo, setLoginInfo] = useState({
        login: "",
        password: ""
    });

    const handleChange = (event: any) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        });
    }

    const logIn = () => {
        // Sends POST to backend and checks if can log in
        console.log(loginInfo);
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
                <Button {...classes('inputgroup')}
                    onClick={logIn}
                >
                    Log in
                </Button>
            </Row>
        </Col>
    )
};

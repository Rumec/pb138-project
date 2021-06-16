import React, {useState} from 'react';
import './LoginPage.css';
import BEMHelper from 'react-bem-helper';
import {Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from "reactstrap";
import {useRecoilState, useRecoilValue} from "recoil";
import {userState} from '../../store/atoms';
import { useHistory } from "react-router-dom";

const classes = new BEMHelper({
    name: 'login',
});


export const LoginPage: React.FC = () => {
    let history = useHistory();

    const [loginInfo, setLoginInfo] = useState({
        login: "",
        password: ""
    });

    const [userInformation, setUserInformation] = useRecoilState(userState);

    const handleChange = (event: any) => {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        });
    }

    /**
     * Sets user information as global state (using recoil) - see ../../store/atoms.ts
     */
    const logIn = () => {
        // Sends POST to backend and checks if can log in
        const loginData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        }

        fetch('http://localhost:5000/api/user/login', loginData)
            .then(async response => {
                if (response.status !== 200) {
                    window.alert("Wrong user name or password");
                    return;
                }
                //const isJson = response.headers.get('content-type')?.includes('application/json');
                const userInformationFetched = await response.json();
                if (userInformation.isLoading) {
                    // Setting global state
                    setUserInformation({isLoading: false, data: userInformationFetched});
                    history.push('/type');
                }
            })
            .catch(err => {
                window.alert('The was an error!\n' + err);
            });
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

import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Details from './Details';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form, Popover, OverlayTrigger, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SignUp(params) {

    const [onError, setOnError] = useState(false);
    const [loginInvalid, setLoginInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target.className;
        console.log(form)

        const data = {
            "name": e.target.username.value,
            "email": e.target.email.value,
            "password": e.target.password.value
        };
        if (data.username === '' || data.password === '' || data.email === '') {
            setOnError(true);
        } else {
            axios.post('https://pr-movies.herokuapp.com/api/user/create', data)
                .then(res => {
                    console.log(res);
                    setSuccess(true);
                    setTimeout(() => {
                        window.location.href = '/signin';
                    }, 2000);
                })
                .catch(err => {
                    if(err.response.data.includes(e.target.username.value)) {
                        setLoginInvalid(true);
                        setTimeout(() => {
                            setLoginInvalid(false);
                        },1500);
                    }
                    if(err.response.data.includes(e.target.email.value)) {
                        setEmailInvalid(true);
                        setTimeout(() => {
                            setEmailInvalid(false);
                        },1500);
                    }
                });
        }
    }




    return (
        <>
            <Navbar />
            <Wrapper>
                <Alert variant={'success'}  style={success ? {position:'absolute', top:'10rem'} : {display:'none'}}> Możesz teraz się zalogować! Za chwilę zostaniesz przeniesiony</Alert>
                <Form noValidate onSubmit={handleSubmit} validated={onError} style={{ width: '30%' }}>
                    <Form.Group className="mb-4" controlId="formBasicLogin">

                        <Form.Label>Login</Form.Label>
                        <Form.Control required type="text" disabled={success} placeholder="Login" name="username" />
                        <StyledAlert style={loginInvalid ? {opacity:'1'} : {opacity:'0'}} variant={'danger'}>Nazwa musi być unikatowa!</StyledAlert>
                        <Form.Control.Feedback type="invalid">
                            Podaj swój login.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="text" disabled={success} placeholder="Email" name="email" />
                        <StyledAlert style={emailInvalid ? {opacity:'1'} : {opacity:'0'}} variant={'danger'}>Użytkownik o takim emailu już istnieje!</StyledAlert>

                        <Form.Control.Feedback type="invalid">
                            Podaj swój email
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">

                        <Form.Label>Hasło</Form.Label>
                        <Form.Control required type="password" disabled={success} placeholder="Hasło" name="password" />
                        <Form.Control.Feedback type="invalid">
                            Podaj swoje hasło.
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Button type="submit">Zarejestruj się</Button>
                </Form>

            </Wrapper>
            <Footer />

        </>
    )
};

const StyledAlert = styled(Alert)`
    position:absolute;
    transition: all 0.5s ease-in-out;
    
`

const Wrapper = styled.div`
    background-color: #282c34;
    color: white;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position:fixed;
    width: 100%;
    height: 100%;
    padding:10rem;
    overflow:auto;
    `
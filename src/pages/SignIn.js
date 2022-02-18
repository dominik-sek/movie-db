import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function SignIn(params) {

    const [token, setToken] = useState('');
    const [onError, setOnError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username;
        const password = e.target.password;
        const data = {
            login: e.target.username.value,
            password: e.target.password.value
        };
        if(data.username === '' || data.password === '') {
            setOnError(true);
        } else {

        axios.post('https://pr-movies.herokuapp.com/api/user/auth', data)
            .then(res => {
                setToken(res.data.token);
                localStorage.setItem('token', res.data.token);
                window.location.href = '/';
            })
            .catch(err => {
                console.log(err.response.data);
                username.className = 'form-control is-invalid';
                password.className = 'form-control is-invalid';
            });
        }
    }


    return (
        <>
            <Navbar />
            <Wrapper>
                <Form noValidate onSubmit={handleSubmit} validated={onError} style={{ width: '30%' }}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">

                        <Form.Label>Login</Form.Label>
                        <Form.Control required type="text" placeholder="Login" name="username" />
                        <Form.Control.Feedback type="invalid">
                            Nieprawidłowy login lub hasło
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">

                        <Form.Label>Hasło</Form.Label>
                        <Form.Control required type="password" placeholder="Hasło" name="password" />
                        <Form.Control.Feedback type="invalid">
                        Nieprawidłowy login lub hasło
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Button type="submit">Zaloguj się</Button>
                </Form>

            </Wrapper>
            <Footer />

        </>
    )
};

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
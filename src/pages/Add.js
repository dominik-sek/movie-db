import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn(params) {

    const [token, setToken] = useState('');
    const [onError, setOnError] = useState(false);
    const [imageLink, setImageLink] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title;
        const image = e.target.image;
        const content = e.target.content;

        const data = {
            title: e.target.title.value,
            image: e.target.image.value,
            content: e.target.content.value
        };
        if (e.target.title.value === '' || e.target.image.value === '' || e.target.content.value === '') {
            setOnError(true);
        } else {

            axios.post('https://pr-movies.herokuapp.com/api/movies', data)
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    console.log(err.response.data);
                    title.className = 'form-control is-invalid';
                    image.className = 'form-control is-invalid';
                    content.className = 'form-control is-invalid';
                });
        }
    }


    const insertPhoto = (e) => {
        e.preventDefault();
        setImageLink(e.target.value);
    }

    return (
        <>
            <Navbar />
            <Wrapper>

                <Form noValidate onSubmit={handleSubmit} validated={onError} style={{ width: '30%' }}>
                {imageLink !== '' ? <img src={imageLink} alt="image" style={{ width: '100%' }} /> : null}
                

                    <Form.Group className="mb-4" controlId="formBasicImage">

                        <Form.Label>URL</Form.Label>
                        <Form.Control onChange={insertPhoto} required type="text" placeholder="link filmu np.https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg" name="image" />
                        <Form.Control.Feedback type="invalid">
                            Brak URL
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTitle">

                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control required type="text" placeholder="tytuł filmu" name="title" />
                        <Form.Control.Feedback type="invalid">
                            Brak tytułu
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContent">

                        <Form.Label>Opis</Form.Label>
                        <Form.Control  required as="textarea" placeholder="Opis Filmu" name="content" />
                        <Form.Control.Feedback type="invalid">
                            Brak Opisu
                        </Form.Control.Feedback>

                    </Form.Group>

                    <Button type="submit">Dodaj Film</Button>
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
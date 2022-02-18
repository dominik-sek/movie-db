import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';

const getMovieData = async (id) => {
    const res = await axios.get(`https://pr-movies.herokuapp.com/api/movies/${id}`);
    return res.data;
}
export default function Details(props) {
    const params = useParams();
    const [movie, setMovie] = React.useState(null);
    useEffect(() => {
        getMovieData(params.id).then(res => {
            setMovie(res);
        });
    }, [params.id]);
    if (!movie) {
        return(
            <>
            <Navbar />
            <Wrapper>
            Ładowanie...
            </Wrapper>
            <Footer />
            </>
        )
    }

    return (
        <>
        <Navbar />
        <Wrapper>
            <h1>{movie.title}</h1>
            <img src={movie.image} alt={movie.title} width='50%'/>
            <p>{movie.content}</p>

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
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    position:fixed;
    width: 100%;
    height: 100%;
    padding:10rem;
    overflow:auto;
    `

import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import MovieItem from '../components/MovieItem';
import styled from 'styled-components';
import { CardGroup, Col, Row } from 'react-bootstrap';

export default function Content(params) {
    const [movies, setMovies] = React.useState(localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : []);
    const slice = movies.slice(0, 10);
    return (
        <>
            <Navbar />
            <Wrapper>
                    {slice.map((movie, index) => {
                        return (
                            <MovieItem movie={movie} />
                        );
                    })}
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
    flex-wrap: wrap;
    position:fixed;
    width: 100%;
    height: 100%;
    padding:10rem;
    overflow:auto;
    `

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { isExpired, decodeToken } from 'react-jwt';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const routes = ["/", "/signup", "/signin"];
const routeNames = ["Strona główna","Zarejestruj się","Zaloguj się"];

const routesLoggedIn = ["/", "/add"];
const routeNamesLoggedIn = ["Strona główna", "Dodaj film"];

export default function Navbar(params) {

    const token = localStorage.getItem('token');
    console.log(token)
    const user = decodeToken(token);
    const [isLoggedIn, setIsLoggedIn] = React.useState(!isExpired(token) ? true : false);
    const navigate = useNavigate();
    const handleLogout = () => {
        const data ={
            userId: user.userId
        }
        axios.delete('https://pr-movies.herokuapp.com/api/user/logout/:userId', data)
            .then(res => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                window.location.reload();
                navigate('/');
            })
    }

    return (
        <NavbarContainer>
            {isLoggedIn ?
                routesLoggedIn.map((route, index) => {
                    return (
                        <NavbarItem key={index}>
                            <Link to={route} key={index}><Button>{routeNamesLoggedIn[index]}</Button></Link>
                        </NavbarItem>
                    )
                }) :
                routes.map((route, index) => {
                    return (
                        <NavbarItem key={index}>
                            <Link to={route} key={index}><Button>{routeNames[index]}</Button></Link>
                        </NavbarItem>
                    )
                })}
                {isLoggedIn ? <NavbarItem><Button variant="danger" onClick={handleLogout}>Wyloguj mnie</Button></NavbarItem> : null}

        </NavbarContainer>

    )
};


const NavbarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    height: 4rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`;

const NavbarItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

import logo from './logo.svg';
import './App.css';
import Content from './pages/Content';
import Details from './pages/Details';
import Add from './pages/Add';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {isExpired} from  "react-jwt";
//single source of truth here



function App() {

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get('https://pr-movies.herokuapp.com/api/movies')
      .then(res =>{
        let movies = res.data;
        movies.reverse();
        setMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      }
)
      .catch(err => console.log(err));
  }, []);
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      if(isExpired(localStorage.getItem('token'))){
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  })


  return (
<Routes>
    <Route exact path="/" element={<Content key={Date.now()} />}></Route>
    <Route path="details/:id" element={<Details key={Date.now()} />}></Route>
    <Route exact path="/add" element={<Add />}></Route>
    <Route exact path="/signup" element={<SignUp />}></Route>
    <Route exact path="/signin" element={<SignIn />}></Route>
    <Route path="*" element={<div>Not found</div>}></Route>

</Routes> 

  );
}

export default App;

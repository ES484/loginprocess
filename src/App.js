import './App.css';
import Login from './Compnents/Login/Login';
import Navbar from './Compnents/Navbar/Navbar';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Compnents/Home/Home';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NotFound from './Compnents/NotFound/NotFound';
function App() {
  const[userData, setUserData]= useState(null);
  let navigate= useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('userToken'))
    {
      getUserData();
    }
  }, []);
  function getUserData()
  {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
  }
  function logOut()
  {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('./login');
  }
  return (
    <>
    <Navbar userData={userData} logOut={logOut}/>
   <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='login' element={<Login/>}/>
     <Route path='home' element={<Home/>}/>
     <Route path='*' element={<NotFound/>}/>
   </Routes>
    </>
  )
}

export default App;

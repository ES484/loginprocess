import axios from 'axios';
import React, { useState } from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth'

import { Joi } from 'joi';

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
        });
        // const facebookProvider = firebase.auth.FacebookAuthProvider();
        // const googleProvider = firebase.auth.GoogleAuthProvider();
        // const githubProvider = firebase.auth.GithubAuthProvider();
    function getUser({target})
    {
        let myUser = {...user};
        myUser[target.name]= target.value;
        setUser(myUser);
        console.log(user);
    }
    async function submitLogin(e)
    {
        e.preventDefault();
        let data =await axios.post('https://api-dev.rescounts.com/api/v1/users/login', user);
        console.log(data);
    }
    function googleAuthentication()
    {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
    }
  return (
    <>
    <div className='w-50 m-auto text-center'>
    <form onSubmit={submitLogin}>
      <div className='input-gp my-3'>
        <label htmlFor='email'></label>
        <input onChange={getUser} className='form-control my-2' name='email' type='email' placeholder='Your Email'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='password'></label>
        <input onChange={getUser} className='form-control my-2' name='password' type='password' placeholder='Password'></input>
      </div>
      <button className='btn text-white form-control'>Login</button>
      <button onClick={googleAuthentication}>Sign in with Google</button>
     </form>
    </div>
    </>
  )
}

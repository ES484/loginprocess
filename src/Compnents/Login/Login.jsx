import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import {signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, getAuth} from 'firebase/auth'
import { authentication } from './firebaseConfig';
import 'firebase/compat/firestore';
export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: ''
    });
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const [errorList, setErrorList] = useState([]);
const [passwordShown, setPasswordShown] = useState(false);
const togglePassword = () => {
  setPasswordShown(!passwordShown);
};
let navigate = useNavigate();
  const signInWithFacebook = ()=>{
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(authentication,facebookProvider)
    .then((re)=>{
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }
  const signInWithGoogle = ()=>{
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(authentication,googleProvider)
    .then((re)=>{
      console.log(re);
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }
  const signInWithApple = ()=>{
    const appleProvider = new OAuthProvider();
    signInWithPopup(authentication,appleProvider)
    .then((re)=>{
      console.log(re);
      navigate('/home');
    })
    .catch((err)=>{
      console.log(err.message);
    });
  }
    function getUser({target})
    {
        let myUser = {...user};
        myUser[target.name]= target.value;
        setUser(myUser);
        console.log(user);
    }
    async function submitLogin (e) 
    {
      e.preventDefault();
      setIsLoading(true);
      let validationResult = validateLoginForm(user);
      console.log(validationResult);
      if(validationResult.error)
      {
        setIsLoading(false);
        setErrorList(validationResult.error.details);
      }
      else
      {
        let {data} =await axios.post('https://routeegypt.herokuapp.com/signin', user);
        if (data.message === 'success')
        {
          localStorage.setItem('userToken', data.token);
          setIsLoading(false);
          navigate('/home');
        }
        else 
        {
          setError(data.message);
          setIsLoading(false);
        }
      }
    }
    function validateLoginForm(user)
    {
      const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/)
      });
      return schema.validate(user, {abortEarly: false});
    }
  return (
    <>
    <div className='w-50 m-auto text-center'>
    {!localStorage.getItem('userToken')?
    <>
    <h2>Login</h2>
    <p className='text-muted'>Add your details to login</p>
    </>:''}
    {errorList.map((error, index)=> {
      if(error.message.includes("password"))
      {
        return <div key={index} className='alert alert-danger'>Password invalid</div>
      }
      else{
    return <div key={index} className='alert alert-danger'>{error.message}</div>
  }
  })}
    {error?<div className='alert alert-danger'>{error}</div>: ''}
    <form onSubmit={submitLogin}>
      <div className='input-gp my-3 position-relative'>
        <label htmlFor='email'></label>
        <input onChange={getUser} className='form-control my-2' name='email' type='email' placeholder='Your Email'/>
        <i className="fa-solid fa-circle-check position-absolute"></i>
      </div>
      <div className='input-gp my-3 position-relative'>
        <label htmlFor='password'></label>
        <input onChange={getUser} className='form-control my-2' name='password' type={passwordShown? "text" : "password"} placeholder='Password'/>
        <i className="fas fa-eye position-absolute" onClick={togglePassword}></i>
      </div>
      <button className='btn text-white form-control login'>{isLoading?<i className='fas fa-spinner'></i>: 'Login'}</button>
     </form>
      <div className='socialLogin'>
          <span>Forget your password?</span>
          <p className='text-muted'>or Login with</p>
          <button onClick={signInWithFacebook} className='facebookBtn btn btn-primary fo form-control text-primary'>
          <i className="fa-brands fa-facebook-square"></i>Login With FaceBook
            </button>
          <button onClick={signInWithGoogle} className='googleBtn btn btn-danger form-control text-danger'>
            <i className="fa-brands fa-google"></i>Login With Google
          </button>
          <button onClick={signInWithApple} className='appleBtn btn btn-dark form-control text-black'>
          <i className="fa-brands fa-apple"></i>Login With Apple
          </button>
      </div>
      <div className='text-center page_footer'>
        <p className='text-muted'>Don't have an account? <span>Sign up</span></p>
        <p>By proceeding, you agree to our <span>Terms of use</span> and confirm you have read our <span>Privacy and Cookie Statement</span></p>
      </div>
    </div>
    </>
  )
}

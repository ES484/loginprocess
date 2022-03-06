import React from 'react';
import logo from '../../Images/Logo.png';
import { Link } from 'react-router-dom';
export default function Navbar() {
  return (
    <>
    <div className='d-flex flex-row-reverse mt-5'>
        <div className='icon'>
            <i className="fa-brands fa-whatsapp fa-2x p-2 rounded"></i>
        </div>
        <div className='icon'>
            <i className="fa-solid fa-phone fa-2x p-2 rounded"></i>
        </div>
    </div>
    <div className='logo m-auto w-25 text-center'>
        <Link to='login'>
            <img src={logo} alt='Logo'/>
        </Link>
    </div>
    </>
  )
}

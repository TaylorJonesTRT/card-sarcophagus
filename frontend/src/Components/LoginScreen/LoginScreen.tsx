/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import loginCards from './login-cards.jpg';

const LoginScreen = () => (
  <div className='grid grid-cols-5'>
    <div className='left-bar col-span-2'>
      <span>hello</span>
    </div>
    <div className='h-screen bg-green-200 col-span-3'>
      <img src={loginCards} className='h-full w-full object-fill' alt='ygobg' />
    </div>
  </div>
);

export default LoginScreen;

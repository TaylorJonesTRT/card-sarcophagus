/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import loginCards from './login-cards.jpg';

const ActionHeader = (props: any) => {
  const { login, clickAction, keyAction } = props;
  if (!login) {
    return (
      <span className='text-sm text-gray-600'>
        Or already have an{' '}
        <span
          role='button'
          tabIndex={0}
          onClick={clickAction}
          onKeyDown={keyAction}
          className='text-indigo-500 hover:underline'
        >
          account?
        </span>
      </span>
    );
  }
  return (
    <span className='text-sm text-gray-600'>
      Don't have an{' '}
      <span
        role='button'
        tabIndex={0}
        onClick={clickAction}
        onKeyDown={keyAction}
        className='text-indigo-500 hover:underline'
      >
        account?
      </span>
    </span>
  );
};

const LoginScreen = (props: any) => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginChange } = props;

  const changeLoginMethod = () => {
    const makeChange = () => {
      setLogin(!login);
    };
    makeChange();
  };

  const handleSubmit = async (event: any) => {
    const cookies = new Cookies();
    event.preventDefault();
    if (!login) {
      await axios
        .post('http://localhost:3001/api/auth/register', {
          username,
          password,
        })
        .then((response) => cookies.set('carsar', response.data.accessToken));
      setTimeout(() => {
        loginChange(true);
      }, 2000);
    } else if (login) {
      await axios
        .post('http://localhost:3001/api/auth/login', { username, password })
        .then((response) => cookies.set('carsar', response.data.accessToken));
      loginChange(true);
    }
  };

  const handleInputChange = (event: any) => {
    if (event.target.name === 'username') {
      return setUsername(event.target.value);
    }
    return setPassword(event.target.value);
  };

  return (
    <div className='grid grid-cols-5 items-center w-full h-full'>
      <div className='left-bar col-span-2 w-3/4 h-max mx-auto'>
        <div className='container'>
          <div className='logo grid grid-flow-row'>
            <h1 className='font-bold text-3xl'>Card Sarcophagus</h1>
            <span className='text-sm text-gray-500 mt-2'>
              A Yu-Gi-Oh! Trading Card Game Vault
            </span>
          </div>
          <div className='login-signup mt-12 grid grid-flow-row'>
            <h2 className='font-bold text-2xl'>
              {login ? 'Login' : 'Sign Up'}
            </h2>
            <ActionHeader
              login={login}
              clickAction={changeLoginMethod}
              keyAction={changeLoginMethod}
            />
            <form className='grid grid-flow-row mt-5' onSubmit={handleSubmit}>
              <label htmlFor='username' className='grid grid-cols-1'>
                Username
                <input
                  type='text'
                  placeholder=''
                  name='username'
                  onChange={handleInputChange}
                  className='border border-gray-300 mt-1 rounded'
                  required
                />
              </label>
              <label htmlFor='password' className='grid grid-cols-1 mt-1'>
                Password
                <input
                  type='password'
                  placeholder=''
                  name='password'
                  onChange={handleInputChange}
                  className='border border-gray-200 mt-1 rounded'
                  required
                />
              </label>
              <button
                type='submit'
                className='bg-gradient-to-tr from-indigo-500 to-violet-500 hover:bg-gradient-to-tr hover:from-violet-500 hover:to-indigo-500 w-full mt-3 rounded p-2 text-white text-sm'
              >
                {login ? 'Log In' : 'Create an Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='h-screen bg-green-200 col-span-3'>
        <img
          src={loginCards}
          className='h-full w-full object-fill'
          alt='ygobg'
        />
      </div>
    </div>
  );
};

export default LoginScreen;

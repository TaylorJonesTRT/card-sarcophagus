/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { object, string } from 'yup';
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

interface Values {
  username: string;
  password: string;
}

const validationSchema = object().shape({
  username: string().email('Invalid email').required('Field is required'),
  password: string()
    .min(8, 'Must be at least 8 characters long')
    .matches(
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/,
      'Password must contain at least one uppercase, one lowercase, one number, and a special character',
    )
    .required('Passsword is required'),
});

const LoginScreen = (props: any) => {
  const [login, setLogin] = useState(false);
  const { loginChange } = props;

  const changeLoginMethod = () => {
    const makeChange = () => {
      setLogin(!login);
    };
    makeChange();
  };

  const handleSubmit = async (username: string, password: string) => {
    const cookies = new Cookies();
    if (!login) {
      await axios
        .post('http://localhost:3001/api/auth/register', {
          username,
          password,
        })
        .then((response) => {
          cookies.set('carsar', response.data.accessToken);
          toast.info('Account created! Logging you in!', {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          setTimeout(() => loginChange(true), 3000);
        })
        .catch((error) =>
          toast.error(`${error.response.data.message}`, {
            position: 'bottom-right',
            autoClose: 1000,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }),
        );
    } else if (login) {
      await axios
        .post('http://localhost:3001/api/auth/login', { username, password })
        .then((response) => cookies.set('carsar', response.data.accessToken));
      loginChange(true);
    }
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
            <div>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values: Values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    handleSubmit(values.username, values.password);
                  }, 2000);
                }}
              >
                <Form className='grid grid-flow-row mt-5'>
                  <label htmlFor='username' className='grid grid-cols-1'>
                    Email{' '}
                    <Field
                      type='email'
                      name='username'
                      className='border border-gray-300 mt-1 rounded'
                    />
                    <div className='text-xs text-red-500'>
                      <ErrorMessage name='username' component='p' />
                    </div>
                  </label>

                  <label htmlFor='password' className='grid grid-cols-1 mt-1'>
                    Password
                    <Field
                      type='password'
                      name='password'
                      className='border border-gray-300 mt-1 rounded'
                    />
                    <div className='text-xs text-red-500'>
                      <ErrorMessage name='password' component='p' />
                    </div>
                  </label>

                  <button
                    type='submit'
                    className='bg-gradient-to-tr from-indigo-500 to-violet-500 hover:bg-gradient-to-tr hover:from-violet-500 hover:to-indigo-500 w-full mt-3 rounded p-2 text-white text-sm'
                  >
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
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

/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import CardArea from './Components/CardArea';
import Header from './Components/Header';
import LoginScreen from './Components/LoginScreen';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const checkJwt = async () => {
    const cookies = new Cookies();
    const checkRequest = await axios
      .post('http://localhost:3001/api/auth/check-auth', null, {
        headers: {
          Authorization: `Bearer ${cookies.get('carsar')}`,
        },
      })
      .then((response) => {
        setLoggedIn(true);
        return true;
      })
      .catch((error) => {
        setLoggedIn(false);
        return false;
      });
    return checkRequest;
  };

  useEffect(() => {
    checkJwt();
  }, []);

  if (!loggedIn) {
    return <LoginScreen loginChange={setLoggedIn} checkJwt={checkJwt} />;
  }

  return (
    <div className='App w-screen h-screen flex flex-col'>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path='/' element={<CardArea checkJwt={checkJwt} />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

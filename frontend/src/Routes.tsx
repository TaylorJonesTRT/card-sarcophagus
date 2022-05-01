/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CardArea from './Components/CardArea';
import Header from './Components/Header';
import BottomBar from './Components/BottomBar';
import LoginScreen from './Components/LoginScreen';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const checkJwt = () => {
    const cookies = new Cookies();
    const token = cookies.get('carsar');
    if (token) {
      setLoggedIn(true);
      return true;
    }
    if (!token) {
      setLoggedIn(false);
      navigate('/');
      return false;
    }
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
      <BottomBar />
    </div>
  );
};

export default AppRoutes;

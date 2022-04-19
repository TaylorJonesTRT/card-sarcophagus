/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useJwt } from 'react-jwt';
import axios from 'axios';
import CardArea from './Components/CardArea';
import Decks from './Components/DeckArea';
import CardEditor from './Components/CardEditor';
import Header from './Components/Header';
import BottomBar from './Components/BottomBar';
import LoginScreen from './Components/LoginScreen';

const AppRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkJwt = () => {
    const cookies = new Cookies();
    const token = cookies.get('carsar');
    if (token) {
      return setLoggedIn(true);
    }
    return setLoggedIn(false);
  };

  useEffect(() => {
    checkJwt();
  }, []);

  if (!loggedIn) {
    return <LoginScreen loginChange={setLoggedIn} checkJwt={checkJwt} />;
  }

  return (
    <div className='App w-screen h-screen flex flex-col'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<CardArea loginChange={setLoggedIn} checkJwt={checkJwt} />}
        />
        <Route
          path='/decks'
          element={<Decks loginChange={setLoggedIn} checkJwt={checkJwt} />}
        />
        <Route
          path='/card-editor'
          element={<CardEditor loginChange={setLoggedIn} checkJwt={checkJwt} />}
        />
      </Routes>
      <BottomBar />
    </div>
  );
};

export default AppRoutes;

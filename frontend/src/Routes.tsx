/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CardArea from './Components/CardArea';
import Decks from './Components/DeckArea';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <CardArea /> }/>
      <Route path="/decks" element={ <Decks />}/>
    </Routes>
  )
}

export default AppRoutes;
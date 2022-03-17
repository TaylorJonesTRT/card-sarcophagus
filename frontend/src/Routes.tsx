/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CardArea from './Components/CardArea';
import Decks from './Components/DeckArea';
import CardEditor from './Components/CardEditor';

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<CardArea />} />
    <Route path='/decks' element={<Decks />} />
    <Route path='/card-editor' element={<CardEditor />} />
  </Routes>
);

export default AppRoutes;

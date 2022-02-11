import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardArea from './Components/CardArea';
import Decks from './Components/DeckArea';

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={ <CardArea /> }/>
      <Route path="/decks" element={ <Decks />}/>
    </Routes>
);

export default AppRoutes;
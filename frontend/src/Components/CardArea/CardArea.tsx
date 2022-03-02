/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BottomBar from '../BottomBar';
import Header from '../Header';

function CardArea() {
  return (
    <div className='App'>
      <Header />
      <h2>Card Area</h2>
      <BottomBar />
    </div>
  );
}

export default CardArea;
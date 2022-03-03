/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BottomBar from '../BottomBar';
import Header from '../Header';

const CardArea = () => {
  return (
    <div className='App w-screen h-screen grid font-sans bg-gradient-to-bl from-gray-800 to-gray-600'>
      <Header />
      <h2>Card Area</h2>
      <BottomBar />
    </div>
  );
}

export default CardArea;
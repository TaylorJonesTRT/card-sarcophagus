/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BottomBar from '../BottomBar';
import Header from '../Header';
import cardBack from '../../Assets/card-back.png';

const CardArea = () => {
  const loadCardEditor = () => {};

  // create fake card data here (use face down cards just to get stuff working)
  const cardData = [
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
  ];
  return (
    <div className='App w-screen h-screen flex flex-col font-sans'>
      <Header />
      <div className='content h-auto'>
        <ul className='flex flex-row gap-4 flex-wrap m-3 pt-10'>
          {cardData.map((card: string | undefined) => (
            <li>
              <div
                role='button'
                tabIndex={0}
                onClick={loadCardEditor}
                onKeyPress={loadCardEditor}
              >
                <img className='w-28 shadow' src={card} alt='ygo-card-back' />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <BottomBar />
    </div>
  );
};

export default CardArea;

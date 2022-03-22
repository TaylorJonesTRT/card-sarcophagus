/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BottomBar from '../BottomBar';
import Header from '../Header';
import deckBox from '../../Assets/deckbox.png';

const DeckArea = () => {
  const cardData = [deckBox, deckBox, deckBox];

  return (
    <div className='App'>
      <Header />
      <div className='content h-auto m-3 pt-10'>
        <div className='decks'>
          <ul className='flex flex-row gap-4'>
            {cardData.map((card: string | undefined) => (
              <li>
                <div role='button' tabIndex={0}>
                  <img className='w-28' src={card} alt='ygo-card-back' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default DeckArea;

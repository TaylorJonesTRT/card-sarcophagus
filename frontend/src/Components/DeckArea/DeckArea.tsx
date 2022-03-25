/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import BottomBar from '../BottomBar';
import Header from '../Header';
import deckBox from '../../Assets/deckbox.png';

const DeckArea = () => {
  const cardData = [deckBox, deckBox, deckBox];

  return (
    <div className='w-full basis-full pt-3'>
      <div className='container w-[1240px] mx-auto decks'>
        <ul className='flex flex-row gap-10'>
          {cardData.map((card: string | undefined) => (
            <li>
              <div
                role='button'
                tabIndex={0}
                className='flex flex-col text-center'
              >
                <img className='w-28' src={card} alt='ygo-card-back' />
                <span>Deck Name</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeckArea;

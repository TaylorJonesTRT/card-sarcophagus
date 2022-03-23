/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import BottomBar from '../BottomBar';
import Header from '../Header';

const CardArea = () => {
  const [cards, setCards] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await axios
        .get('http://localhost:3001/api/cards')
        .then((response) => {
          setCards(response.data);
        });
      return fetchedCards;
    };
    fetchCards();
  }, []);

  return (
    <div className='App w-screen h-screen flex flex-col font-sans'>
      <Header />
      <div className='content h-auto'>
        <ul className='flex flex-row gap-4 flex-wrap m-3 pt-10'>
          {cards!.map((card) => (
            <li key={card.cardId}>
              <div
                role='button'
                tabIndex={0}
                onClick={(e) => navigate(`/card-editor?cardId=${card.cardId}`)}
                onKeyPress={(e) =>
                  navigate(`/card-editor?cardId=${card.cardId}`)
                }
                id={card.cardId}
              >
                <img
                  className='w-28 shadow'
                  src={card!.cardImage}
                  alt='ygo-card-back'
                />
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

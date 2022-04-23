/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import deckBox from '../../Assets/deckbox.png';

const DeckArea = (props: any) => {
  const [decks, setDecks] = useState();
  const { checkJwt } = props;
  const cardData = [deckBox, deckBox, deckBox];
  const navigate = useNavigate();

  useEffect(() => {
    checkJwt();
    const fetchDecks = async () => {
      const cookies = new Cookies();
      const fetchedCards = await axios
        .get('http://localhost:3001/api/cards')
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          if (error.response.status.statusCode === 401) {
            cookies.remove('carsar');
            navigate('/login');
            return window.location.reload();
          }
          return console.log(error.response);
        });
      return fetchedCards;
    };
    fetchDecks();
  }, []);
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

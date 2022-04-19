/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const CardArea = (props: any) => {
  const [cards, setCards] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      const cookies = new Cookies();
      const fetchedCards = await axios
        .get('http://localhost:3001/api/cards', {
          headers: {
            Authorization: `Bearer ${cookies.get('carsar')}`,
          },
        })
        .then((response) => {
          setCards(response.data.ownedCards);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            cookies.remove('carsar');
            return navigate('/');
          }
        });
      return fetchedCards;
    };
    fetchCards();
  }, []);

  return (
    <div className='w-full basis-full pt-3'>
      <div className='container:lg w-[1240px] mx-auto'>
        <ul className='flex flex-row gap-4 flex-wrap overflow-auto'>
          {cards[0] !== undefined &&
            Object.values(cards[0]).map((card: any) => (
              <li key={card.cardId}>
                <div
                  role='button'
                  tabIndex={0}
                  onClick={(e) =>
                    navigate(`/card-editor?cardId=${card.cardId}`)
                  }
                  onKeyPress={(e) =>
                    navigate(`/card-editor?cardId=${card.cardId}`)
                  }
                  id={card.cardId}
                  key={card.cardId}
                >
                  <img
                    className='w-28 shadow'
                    src={card.cardImage}
                    alt='ygo-card-back'
                    key={card.cardId}
                  />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CardArea;

/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import faceDownCard from '../../Assets/faceDownCard.webp';
import EditorModal from '../EditorModal';
import BottomBar from '../BottomBar';

const CardArea = (props: any) => {
  const [cards, setCards] = useState<any[]>([]);
  const [sortedCards, setSortedCards] = useState<any[]>([]);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [clickedCardId, setClickedCardId] = useState<number>();
  const [hoveredCardId, setHoveredCardId] = useState();
  const [editorType, setEditorType] = useState<string>('');
  const navigate = useNavigate();
  const { checkJwt } = props;

  useEffect(() => {
    checkJwt();
    const fetchCards = async () => {
      const cookies = new Cookies();
      const fetchedCards = await axios
        .get('http://localhost:3001/api/cards', {
          headers: {
            Authorization: `Bearer ${cookies.get('carsar')}`,
          },
        })
        .then((response) => {
          setCards(response.data.activeUser.ownedCards);
        })
        .catch((error) => {
          console.log(error);
        });
      return fetchedCards;
    };
    fetchCards();
  }, []);

  const newCardClick = () => {
    checkJwt();
    setClickedCardId(undefined);
    setShowCardModal(true);
  };

  const handleCardClick = (cardId: number) => {
    checkJwt();
    setClickedCardId(cardId);
    setShowCardModal(true);
  };

  const updateCards = async (sortOption: string, searchString: string) => {
    const cookies = new Cookies();
    if (sortOption) {
      const fetchedCards = await axios
        .post(
          'http://localhost:3001/api/cards/sorted',
          { sortOption },
          {
            headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
          },
        )
        .then((response) => setSortedCards(response.data.sortedArray));
      return fetchedCards;
    }
    if (searchString) {
      const searchedCards = await axios
        .post(
          'http://localhost:3001/api/cards/search',
          { cardName: searchString },
          {
            headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
          },
        )
        .then((response) => setSortedCards(response.data.store));
      return searchedCards;
    }
  };

  const searchCards = async (string: string) => {};

  const closeModal = () => setShowCardModal(false);

  return (
    <>
      <div className='w-full basis-full pt-3 pb-3 overflow-auto justify-around mx-auto'>
        <div className='container:lg w-[1240px] mx-auto'>
          {showCardModal && (
            <EditorModal
              cardId={clickedCardId}
              closeModal={closeModal}
              editorType={editorType}
            />
          )}
          <ul className='flex flex-row gap-7 flex-wrap overflow-auto pl-1'>
            <li key='newCard' className='relative text-center'>
              <div
                role='button'
                tabIndex={0}
                onClick={() => {
                  setEditorType('newCard');
                  newCardClick();
                }}
              >
                <img
                  src={faceDownCard}
                  alt='add new card'
                  className='w-28 shadow opacity-30 grayscale'
                />
                <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  Add a new card
                </span>
              </div>
            </li>
            {sortedCards[0] === undefined ? (
              <>
                {cards[0] !== undefined &&
                  Object.values(cards[0]).map((card: any) => (
                    <li key={card.cardId}>
                      <div
                        role='button'
                        tabIndex={0}
                        onClick={(e) => {
                          setEditorType('ownedCard');
                          handleCardClick(card.cardId);
                        }}
                        onKeyPress={(e) => handleCardClick(card.cardId)}
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
              </>
            ) : (
              <>
                {sortedCards[0] !== undefined &&
                  Object.values(sortedCards[0]).map((card: any) => (
                    <li key={card.cardId}>
                      <div
                        role='button'
                        tabIndex={0}
                        onClick={(e) => {
                          setEditorType('ownedCard');
                          handleCardClick(card.cardId);
                        }}
                        onKeyPress={(e) => handleCardClick(card.cardId)}
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
              </>
            )}
          </ul>
        </div>
      </div>
      <div className='w-full'>
        <BottomBar updateCards={updateCards} hoveredCardId={hoveredCardId} />
      </div>
    </>
  );
};

export default CardArea;

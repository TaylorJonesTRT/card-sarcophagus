/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import deckBox from '../../Assets/deckbox.png';
import EditorModal from '../EditorModal';

const DeckArea = (props: any) => {
  const { checkJwt } = props;
  const [decks, setDecks] = useState<any[]>([]);
  const [clickedDeckName, setClickedDeckName] = useState<string>();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const cardData = [deckBox, deckBox, deckBox];
  const navigate = useNavigate();

  useEffect(() => {
    checkJwt();
    const fetchDecks = async () => {
      const cookies = new Cookies();
      const fetchedCards = await axios
        .get('http://localhost:3001/api/decks', {
          headers: {
            Authorization: `Bearer ${cookies.get('carsar')}`,
          },
        })
        .then((response) => {
          setDecks(response.data.allDecks);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            cookies.remove('carsar');
            navigate('/');
            return window.location.reload();
          }
        });
    };
    fetchDecks();
  }, []);

  const openNewDeckModal = () => {
    checkJwt();
    setClickedDeckName(undefined);
    setShowEditor(true);
  };

  const openEditDeckModal = (deckName: string) => {
    checkJwt();
    setClickedDeckName(deckName);
    setShowEditor(true);
  };

  const closeDeckModal = () => {
    setShowEditor(false);
  };

  return (
    <div className='w-full basis-full pt-3'>
      <div className='container w-[1240px] mx-auto decks'>
        {showEditor && (
          <EditorModal
            clickedDeckName={clickedDeckName}
            closeModal={closeDeckModal}
            editorType='deck'
          />
        )}
        <ul className='flex flex-row gap-10'>
          <li key='addNewDeck' className='text-center'>
            <div role='button' tabIndex={0} onClick={openNewDeckModal}>
              <img
                className='w-28 opacity-50 grayscale'
                src={deckBox}
                alt='add new deck'
              />
              <span>Add new deck</span>
            </div>
          </li>
          {decks.map((deck: any) => (
            <li>
              <div
                role='button'
                tabIndex={0}
                className='flex flex-col text-center'
                onClick={(e) => {
                  openEditDeckModal(deck.deckName);
                }}
              >
                <img className='w-28' src={deckBox} alt='ygo-card-back' />
                <span>{deck!.deckName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeckArea;

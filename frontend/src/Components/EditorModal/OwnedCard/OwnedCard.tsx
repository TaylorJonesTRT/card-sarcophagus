/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import cardBack from '../../../Assets/card-back.png';

const OwnedCard = (props: any) => {
  const { closeModal, cardId } = props;
  const [cardImage, setCardImage] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardOwned, setCardOwned] = useState<boolean>();
  const [amountOfCopies, setAmountOfCopies] = useState<number>();
  const [availableCopies, setAvailableCopies] = useState<number>();
  const [binderLocation, setBinderLocation] = useState<string>('');
  const [boxLocation, setBoxLoaction] = useState<string>('');
  const [requestType, setRequestType] = useState<string>('');

  const cookies = new Cookies();

  const clearState = () => {
    setCardImage('');
    setCardName('');
    setCardOwned(false);
    setAmountOfCopies(0);
    setAvailableCopies(0);
    setBinderLocation('');
    setBoxLoaction('');
  };

  useEffect(() => {
    clearState();
    if (cardId) {
      const fillInCardEditor = async () => {
        if (cardId) {
          const card = await axios
            .post(
              'http://localhost:3001/api/cards/card',
              { cardId },
              {
                headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
              },
            )
            .then((response) => {
              if (response.data.message) {
                if (response.data.message === 'not an owned card') {
                  setCardImage('');
                  setCardName('');
                  setCardOwned(false);
                  setAmountOfCopies(0);
                  setAvailableCopies(0);
                  setBinderLocation('');
                  setBoxLoaction('');
                }
              }
              if (response.data[0]) {
                return response.data[0];
              }
            });
          const cardKey = Object.keys(card);
          setCardImage(card[cardKey[0]]['cardImage']);
          setCardName(card[cardKey[0]]['cardName']);
          setCardOwned(card[cardKey[0]]['owned']);
          setAmountOfCopies(card[cardKey[0]]['amountOfCopies']);
          setAvailableCopies(card[cardKey[0]]['availableCopies']);
          setBinderLocation(card[cardKey[0]]['binderLocation']);
          setBoxLoaction(card[cardKey[0]]['boxLocation']);
        }
      };
      fillInCardEditor();
    }
  }, [cardId]);

  const handleEditorSubmit = async (event: any) => {
    event.preventDefault();
    if (requestType === 'submit') {
      event.preventDefault();
      await axios
        .post(
          'http://localhost:3001/api/cards',
          {
            cardId,
            amountOfCopies,
            availableCopies,
            binderLocation,
            boxLocation,
          },
          {
            headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
          },
        )
        .then((response) => {
          toast.info('Card added!', {
            position: 'bottom-right',
            autoClose: 500,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          }, 501);
        })
        .catch((error) => {
          toast.info(error.response.data.message, {
            position: 'bottom-right',
            autoClose: 500,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
        });
    }
    if (requestType === 'remove') {
      await axios
        .delete('http://localhost:3001/api/cards', {
          data: { cardId },
          headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
        })
        .then((response) => {
          toast.info('Card has been removed!', {
            position: 'bottom-right',
            autoClose: 500,
            hideProgressBar: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          });
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          }, 501);
        });
    }
  };

  const handleExit = () => {
    clearState();
    closeModal();
  };

  return (
    <form
      onSubmit={(event) => handleEditorSubmit(event)}
      className='w-[900px] h-[250px] fixed inset-0 z-50 overflow-x-hidden overflow-y-auto justify-center items-center bg-gradient-to-r from-gray-700 to-gray-900 rounded grid grid-flow-col auto-cols-auto p-5 text-white mx-auto mt-52'
    >
      <FontAwesomeIcon
        icon={faCircleXmark}
        className='absolute top-2 left-2 cursor-pointer'
        onClick={handleExit}
        title='Close'
      />
      {cardImage ? (
        <img src={cardImage} alt={cardName} className='mt-2 w-28' />
      ) : (
        <img src={cardBack} alt='card' className='mt-2 w-28' />
      )}

      <ul className='h-max grid grid-col-2 gap-2 pl-5'>
        <li className='col-start-1'>
          <label htmlFor='card-name'>
            Card Name:
            <input
              type='text'
              id='card-name'
              name='cardName'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              value={cardName || ''}
            />
          </label>
        </li>
        <li>
          <label htmlFor='card-owned' className='flex flex-col'>
            Owned?:
            <input
              type='checkbox'
              id='cardOwned'
              name='owned'
              className='text-black border-2 border-gray-400 rounded outline-none w-7 h-7'
              defaultChecked={cardOwned}
              onChange={(e) => setCardOwned(e.target.checked)}
            />
          </label>
        </li>
        <li>
          <label htmlFor='card-amount-copies'>
            Owned Copies:
            <input
              type='number'
              id='card-amount-copies'
              name='amountOfCopies'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              defaultValue={amountOfCopies}
              onChange={(e) => setAmountOfCopies(parseInt(e.target.value, 10))}
            />
          </label>
        </li>
        <li className='col-start-2'>
          <label htmlFor='card-available-copies'>
            Available for Use:
            <input
              type='number'
              id='card-available-copies'
              name='availableCopies'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              defaultValue={availableCopies}
              onChange={(e) => setAvailableCopies(parseInt(e.target.value, 10))}
            />
          </label>
        </li>
        <li>
          <label htmlFor='card-box-location'>
            Box Location:
            <input
              type='text'
              id='card-box-location'
              name='boxLocation'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              defaultValue={boxLocation}
              onChange={(e) => setBoxLoaction(e.target.value)}
            />
          </label>
        </li>
        <li>
          <label htmlFor='card-binder-location'>
            Binder Location:
            <input
              type='text'
              id='card-binder-location'
              name='binderLocation'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              defaultValue={binderLocation}
              onChange={(e) => setBinderLocation(e.target.value)}
            />
          </label>
        </li>
      </ul>
      <div className='flex flex-col gap-4 w-full h-full'>
        <button
          className='card-editor-button grow h-auto p-4 bg-gradient-to-tr from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded text-blue-900'
          type='submit'
          onClick={() => setRequestType('submit')}
        >
          Submit Card
        </button>
        {cardId && (
          <button
            className='card-editor-button-delete grow h-auto p-4 bg-gradient-to-tr from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 rounded text-orange-900'
            type='submit'
            onClick={() => setRequestType('remove')}
          >
            Remove Card
          </button>
        )}
      </div>
    </form>
  );
};

export default OwnedCard;

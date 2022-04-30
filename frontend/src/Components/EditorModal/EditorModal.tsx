import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import cardBack from '../../Assets/card-back.png';

const EditorModal = (props: any) => {
  const { cardId, closeModal } = props;
  const handleInputChange = () => {};
  const [cardImage, setCardImage] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardOwned, setCardOwned] = useState<boolean>();
  const [amountOfCopies, setAmountOfCopies] = useState<number>();
  const [availableCopies, setAvailableCopies] = useState<number>();
  const [binderLocation, setBinderLocation] = useState<string>('');
  const [boxLocation, setBoxLoaction] = useState<string>('');

  const cookies = new Cookies();

  useEffect(() => {
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
            .then((response) => response.data.card);
          setCardImage(card.cardImage);
          setCardName(card.cardName);
          setCardOwned(card.owned);
          setAmountOfCopies(card.amountOfCopies);
          setAvailableCopies(card.availableCopies);
          setBinderLocation(card.binderLocation);
          setBoxLoaction(card.boxLocation);
        }
      };
      fillInCardEditor();
    }
  }, []);

  const handleEditorSubmit = () => {};

  const handleExit = () => {
    closeModal();
  };

  return (
    <form className='w-[900px] h-[250px] fixed inset-0 z-50 overflow-x-hidden overflow-y-auto justify-center items-center bg-gradient-to-r from-gray-700 to-gray-900 rounded grid grid-flow-col auto-cols-auto p-5 text-white mx-auto mt-52'>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className='absolute top-2 left-2 cursor-pointer'
        onClick={handleExit}
        title='Close'
      />
      <img src={cardBack} alt='card' className='mt-2' />
      <ul className='h-max grid grid-col-2 gap-2 pl-5'>
        <li className='col-start-1'>
          <label htmlFor='card-name'>
            Card Name:
            <input
              type='text'
              id='card-name'
              name='cardName'
              className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
              defaultValue={cardName || ''}
              onChange={handleInputChange}
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
              defaultChecked={cardOwned || false}
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
            />
          </label>
        </li>
      </ul>
      <div className='flex flex-col gap-4 w-full h-full'>
        <button
          className='card-editor-button grow h-auto p-4 bg-gradient-to-tr from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded text-blue-900'
          type='submit'
          onSubmit={handleEditorSubmit}
        >
          Submit Card
        </button>
        {cardId && (
          <button
            className='card-editor-button-delete grow h-auto p-4 bg-gradient-to-tr from-orange-400 to-red-500 hover:from-red-500 hover:to-orange-400 rounded text-orange-900'
            type='submit'
          >
            Remove Card
          </button>
        )}
      </div>
    </form>
  );
};

export default EditorModal;

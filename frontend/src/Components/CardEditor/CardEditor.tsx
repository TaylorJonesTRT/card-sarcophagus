/* eslint-disable dot-notation */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import cardBack from '../../Assets/card-back.png';
import BottomBar from '../BottomBar';
import Header from '../Header';

interface PopulatedData {
  _id: number;
  cardId: number;
  cardName: string;
  cardType: string;
  cardLevel: number;
  cardAttribute: string;
  cardRace: string;
  cardDesc: string;
  cardAtk: number;
  cardDef: number;
  cardImage: string;
  owned: boolean;
  amountOfCopies: number;
  availableCopies: number;
  boxLocation: null;
  binderLocation: null;
  __v: number;
}

const CardEditor = () => {
  const cardEditorSubmit = () => {};

  const [searchParams, setSearchParams] = useSearchParams();
  const [populatedCardData, setPopulatedCardData] = useState<
    PopulatedData | undefined
  >({
    _id: 0,
    cardId: 0,
    cardName: '',
    cardType: '',
    cardLevel: 0,
    cardAttribute: '',
    cardRace: '',
    cardDesc: '',
    cardAtk: 0,
    cardDef: 0,
    cardImage: '',
    owned: false,
    amountOfCopies: 0,
    availableCopies: 0,
    boxLocation: null,
    binderLocation: null,
    __v: 0,
  });
  const [emptyEditor, setEmptyEditor] = useState(true);
  const cardId = searchParams.get('cardId');

  useEffect(() => {
    const fillInCardEditor = async () => {
      if (cardId !== null) {
        const card = await axios
          .post('http://localhost:3001/api/cards/card', { cardId })
          .then((response) => response.data[0]);
        setEmptyEditor(false);
        return setPopulatedCardData(card);
      }
      return setEmptyEditor(true);
    };
    fillInCardEditor();
  }, []);

  return (
    <div className='w-full basis-full'>
      <div className='container:lg w-[1240px] mx-auto'>
        <form className='w-[900px] h-[250px] bg-gradient-to-r from-gray-700 to-gray-900 rounded grid grid-flow-col auto-cols-auto p-5 text-white mx-auto mt-52'>
          <img src={cardBack} alt='card' />
          <ul className='h-max grid grid-col-2 gap-2 pl-5'>
            <li className='col-start-1'>
              <label htmlFor='card-name'>
                Card Name:
                <input
                  type='text'
                  id='card-name'
                  name='card-name'
                  className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
                  value={populatedCardData!.cardName || ''}
                />
              </label>
            </li>
            <li>
              <label htmlFor='card-owned' className='flex flex-col'>
                Owned?:
                <input
                  type='checkbox'
                  id='card-owned'
                  name='card-owned'
                  className='text-black border-2 border-gray-400 rounded outline-none w-7 h-7'
                  checked={populatedCardData!.owned || false}
                />
              </label>
            </li>
            <li>
              <label htmlFor='card-amount-copies'>
                Owned Copies:
                <input
                  type='number'
                  id='card-amount-copies'
                  name='card-amount-copies'
                  className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
                  value={populatedCardData?.amountOfCopies}
                />
              </label>
            </li>
            <li className='col-start-2'>
              <label htmlFor='card-available-copies'>
                Available for Use:
                <input
                  type='number'
                  id='card-available-copies'
                  name='card-available-copies'
                  className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
                  value={populatedCardData?.availableCopies}
                />
              </label>
            </li>
            <li>
              <label htmlFor='card-box-location'>
                Box Location:
                <input
                  type='text'
                  id='card-box-location'
                  name='card-box-location'
                  className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
                  value={populatedCardData?.boxLocation || ''}
                />
              </label>
            </li>
            <li>
              <label htmlFor='card-binder-location'>
                Binder Location:
                <input
                  type='text'
                  id='card-binder-location'
                  name='card-binder-location'
                  className='text-black border-2 border-gray-400 rounded outline-none focus:border-blue-400'
                  value={populatedCardData?.binderLocation || ''}
                />
              </label>
            </li>
          </ul>
          <button
            className='card-editor-button p-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded text-blue-900'
            type='submit'
            onSubmit={cardEditorSubmit}
          >
            Submit Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardEditor;

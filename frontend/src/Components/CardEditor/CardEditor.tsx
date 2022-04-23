/* eslint-disable dot-notation */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-exports */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import cardBack from '../../Assets/card-back.png';

interface PopulatedData {
  card: {
    cardName: string;
    amountOfCopies: number;
    availableCopies: number;
    binderLocation: string;
    boxLocation: string;
    owned: boolean;
    cardId: number;
  };
}

const CardEditor = (props: any) => {
  const { checkJwt } = props;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [populatedCardData, setPopulatedCardData] = useState<
    PopulatedData | undefined
  >(undefined);
  const cardId = searchParams.get('cardId');

  useEffect(() => {
    checkJwt();
    const fillInCardEditor = async () => {
      const cookies = new Cookies();
      if (cardId === null) {
        return setPopulatedCardData(undefined);
      }
      const card = await axios
        .post(
          'http://localhost:3001/api/cards/card',
          { cardId },
          {
            headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
          },
        )
        .then((response) => response.data);
      return setPopulatedCardData(card);
    };
    fillInCardEditor();
  }, []);

  const handleInputChange = (event: any) => {};

  const cardEditorSubmit = () => {
    checkJwt();
  };

  return (
    <div className='w-full basis-full'>
      <div className='container:lg w-[1240px] mx-auto'>
        <form className='w-[900px] h-[250px] bg-gradient-to-r from-gray-700 to-gray-900 rounded grid grid-flow-col auto-cols-auto p-5 text-white mx-auto mt-52'>
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
                  defaultValue={populatedCardData?.card.cardName || ''}
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
                  defaultChecked={populatedCardData?.card.owned || false}
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
                  defaultValue={populatedCardData?.card.amountOfCopies}
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
                  defaultValue={populatedCardData?.card.availableCopies}
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
                  defaultValue={populatedCardData?.card.boxLocation}
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
                  defaultValue={populatedCardData?.card.binderLocation}
                />
              </label>
            </li>
          </ul>
          <button
            className='card-editor-button h-auto p-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-blue-500 hover:to-cyan-400 rounded text-blue-900'
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

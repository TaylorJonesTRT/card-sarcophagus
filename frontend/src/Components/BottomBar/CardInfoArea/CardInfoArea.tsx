/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import cardBack from '../../../Assets/card-back.png';

const CardInfoArea = (props: any) => {
  const { hoveredCardId } = props;
  const [name, setName] = useState<string>('');
  const [level, setLevel] = useState<number>();
  const [attack, setAttack] = useState<number>();
  const [defense, setDefense] = useState<number>();
  const [attribute, setAttribute] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [test, setTest] = useState<any>();

  useEffect(() => {
    if (hoveredCardId !== undefined) {
      const fetchCard = async () => {
        const cookies = new Cookies();
        const card = await axios
          .post(
            'http://localhost:3001/api/cards/card',
            { cardId: hoveredCardId },
            {
              headers: { Authorization: `Bearer ${cookies.get('carsar')}` },
            },
          )
          .then((response) => response.data[0]);
        const cardKey = Object.keys(card);
        setName(card[cardKey[0]]['cardName']);
        setLevel(card[cardKey[0]]['cardLevel']);
        setAttack(card[cardKey[0]]['cardAttack']);
        setDefense(card[cardKey[0]]['cardDefense']);
        setAttribute(card[cardKey[0]]['cardAttribute']);
        setType(card[cardKey[0]]['cardType']);
        setDesc(card[cardKey[0]]['cardDesc']);
        setImage(card[cardKey[0]]['cardImage']);
      };
      fetchCard();
    }
    if (hoveredCardId === undefined) {
      setName('');
      setLevel(undefined);
      setAttack(undefined);
      setDefense(undefined);
      setAttribute('');
      setType('');
      setDesc('');
      setImage('');
    }
  }, [hoveredCardId]);

  return (
    <div className='card-info-area grid grid-cols-6'>
      {image ? (
        <img src={image} className='w-28' alt='card' />
      ) : (
        <img src={cardBack} className='w-28' alt='card' />
      )}

      <div className='card-information ml-4 grid grid-rows-4 grid-cols-3 mt-2 col-span-5 overflow-hidden'>
        <span className='card-name text-xs '>{name}</span>
        <span className='card-level text-xs'>{level}</span>
        <span className='card-attack text-xs'>{attack}</span>
        <span className='card-defense text-xs'>{defense}</span>
        <span className='card-deffense text-xs'>{attribute}</span>
        <span className='card-type text-xs grow-0'>{type}</span>
        <span className='card-description overflow-hidden col-span-3 row-span-3 text-xs grow-0 max-h-[75px] bg-blue-200'>
          {desc}
        </span>
      </div>
    </div>
  );
};

export default CardInfoArea;

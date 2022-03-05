import React from 'react';
import cardBack from '../../../Assets/card-back.png';

const CardInfoArea = () => {
  return (
    <div className='card-info-area m-3 flex flex-row w-1/2'>
      <img src={cardBack} className='w-24' alt='card' />
      <div className='card-information ml-4 flex flex-col flex-wrap gap-3 mt-2'>
        <span className='card-name text-sm'>Card Name</span>  
        <span className='card-level text-sm'>Card Lvl</span>
        <span className='card-attack text-sm'>Card Attack - Card Defense</span>
        <span className='card-deffense text-sm'>Card Attribute - Card Type</span>
        <span className='card-description text-sm'>Card Description</span>
      </div>
    </div>
  )
}

export default CardInfoArea;
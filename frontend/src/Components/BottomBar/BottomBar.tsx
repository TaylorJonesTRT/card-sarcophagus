/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import CardInfoArea from './CardInfoArea';
import SortOptions from './SortOptions';

const BottomBar =() => {
  return (
    <footer className='h-40 fixed inset-x-0 bottom-0 bg-gradient-to-bl
    from-gray-800 to-gray-600 flex flex-row justify-between'
    >
      <CardInfoArea />
      <SortOptions />
    </footer>
  )
}

export default BottomBar;

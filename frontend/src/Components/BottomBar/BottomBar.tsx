/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import CardInfoArea from './CardInfoArea';
import SortOptions from './SortOptions';

const BottomBar = () => (
  <footer
    className='bg-gradient-to-bl
    from-gray-800 to-gray-600 flex flex-row justify-between text-white basis-auto'
  >
    <div className='container:lg w-[1240px] flex flex-row mx-auto'>
      <CardInfoArea />
      <SortOptions />
    </div>
  </footer>
);

export default BottomBar;

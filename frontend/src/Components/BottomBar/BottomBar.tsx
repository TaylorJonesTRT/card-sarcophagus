/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import CardInfoArea from './CardInfoArea';
import SortOptions from './SortOptions';

const BottomBar = (props: any) => {
  const { updateCards, hoveredCardId } = props;
  return (
    <footer
      className='bg-gradient-to-bl
    from-gray-800 to-gray-600 grid grid-cols-2 justify-items-center text-white basis-auto'
    >
      <CardInfoArea hoveredCardId={hoveredCardId} />
      <SortOptions updateCards={updateCards} />
    </footer>
  );
};

export default BottomBar;

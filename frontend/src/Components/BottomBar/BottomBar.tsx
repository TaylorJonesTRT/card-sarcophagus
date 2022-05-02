/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import CardInfoArea from './CardInfoArea';
import SortOptions from './SortOptions';

const BottomBar = (props: any) => {
  const { updateCards } = props;
  return (
    <footer
      className='bg-gradient-to-bl
    from-gray-800 to-gray-600 flex flex-row justify-between text-white basis-auto'
    >
      <CardInfoArea />
      <SortOptions updateCards={updateCards} />
    </footer>
  );
};

export default BottomBar;

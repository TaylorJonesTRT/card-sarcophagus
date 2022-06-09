/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import SortOptions from './SortOptions';

const BottomBar = (props: any) => {
  const { updateCards, searchCards, hoveredCardId } = props;
  return (
    <div className='w-full'>
      <footer
        className='bg-gradient-to-bl
    from-gray-800 to-gray-600 grid grid-cols-2 text-white basis-auto w-full'
      >
        <SortOptions
          className='container-lg w-[1240px] mx-auto'
          updateCards={updateCards}
        />
      </footer>
    </div>
  );
};

export default BottomBar;

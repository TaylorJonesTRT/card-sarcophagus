/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

const SearchBar = (props: any) => {
  const { updateCards } = props;
  const [searchInput, setSearchInput] = useState<string>('');

  const handleInputChange = (event: any) => {
    setSearchInput(event.target.value);
    if (event.target.value === '') {
      updateCards('cardName', false);
    }
    updateCards(false, event.target.value.toLowerCase());
  };

  return (
    <form className='pt-5'>
      <ul>
        <li>
          <label htmlFor='card-name' className='grid grid-rows-2'>
            Search:
            <input
              type='text'
              id='card-search'
              name='card-name'
              className='border-2 border-gray-400 rounded outline-none focus:border-blue-400 text-black'
              value={searchInput}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
        </li>
      </ul>
    </form>
  );
};

export default SearchBar;

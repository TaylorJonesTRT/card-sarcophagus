import React from 'react';

const SortOptions = () => (
  <div className='sort-options w-1/2 flex flex-col m-3'>
    <form>
      <ul>
        <li>
          <label htmlFor='card-name' className='grid grid-rows-2'>
            Search:
            <input
              type='text'
              id='card-search'
              name='card-name'
              className='border-2 border-gray-400 rounded outline-none focus:border-blue-400'
            />
          </label>
        </li>
      </ul>
      <ul className='grid grid-cols-5'>
        <li>
          <input
            type='radio'
            id='card-name'
            name='card-sort-options'
            value='Name'
          />
          Name
        </li>
        <li>
          <label htmlFor='card-attack'>
            <input
              type='radio'
              id='card-attack'
              name='card-sort-options'
              value='Attack'
            />
            Attack
          </label>
        </li>
        <li>
          <label htmlFor='card-defense'>
            <input
              type='radio'
              id='card-defense'
              name='card-sort-options'
              value='Defense'
            />
            Defense
          </label>
        </li>
        <li>
          <label htmlFor='card-level'>
            Level
            <input
              type='radio'
              id='card-level'
              name='card-sort-options'
              value='Level'
            />
          </label>
        </li>
        <li>
          <label htmlFor='card-type'>
            <input
              type='radio'
              id='card-type'
              name='card-sort-options'
              value='Type'
            />
            Card Type
          </label>
        </li>
      </ul>
    </form>
  </div>
);

export default SortOptions;

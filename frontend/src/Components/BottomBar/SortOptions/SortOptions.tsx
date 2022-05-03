import React from 'react';

const SortOptions = (props: any) => {
  const { updateCards } = props;

  return (
    <div className='sort-options flex flex-col m-3'>
      <form>
        <h2>Sort Cards By:</h2>
        <ul className='flex flex-cols-5 gap-10 pt-1'>
          <li>
            <input
              type='radio'
              id='card-name'
              name='card-sort-options'
              className='mr-2'
              value='cardName'
              defaultChecked
              onChange={(event) => updateCards(event.target.value)}
            />
            Name
          </li>
          <li>
            <label htmlFor='card-attack'>
              <input
                type='radio'
                id='card-attack'
                name='card-sort-options'
                className='mr-2'
                value='cardAtk'
                onChange={(event) => updateCards(event.target.value)}
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
                className='mr-2'
                value='cardDef'
                onChange={(event) => updateCards(event.target.value)}
              />
              Defense
            </label>
          </li>
          <li>
            <label htmlFor='card-level'>
              <input
                type='radio'
                id='card-level'
                name='card-sort-options'
                className='mr-2'
                value='cardLevel'
                onChange={(event) => updateCards(event.target.value)}
              />
              Level
            </label>
          </li>
          <li>
            <label htmlFor='card-type'>
              <input
                type='radio'
                id='card-type'
                name='card-sort-options'
                className='mr-2'
                value='cardType'
                onChange={(event) => updateCards(event.target.value)}
              />
              Card Type
            </label>
          </li>
        </ul>
      </form>
      <form className='pt-5'>
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
      </form>
    </div>
  );
};

export default SortOptions;

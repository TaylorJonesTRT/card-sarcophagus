import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header
    className='
    w-full mx-auto h-9 justify-around shadow-xl bg-gradient-to-r 
    from-gray-900 to-gray-700 text-white border-b-2 border-gray-700 basis-9'
  >
    <div className='container-lg w-[1240px] flex flex-row mx-auto justify-between pt-1 overflow-hidden flex-grow'>
      <h1 className='font-bold'>
        <Link to='/'>Card Sarcophagus</Link>
      </h1>
      <div className=''>
        <Link to='/card-editor'>+ Add a Card</Link>
      </div>
      <nav className=''>
        <ul className='flex flex-row justify-end'>
          <li className='mr-6 hover:underline'>
            <Link to='/'>Cards</Link>
          </li>
          <li className='mr-6 hover:underline'>
            <Link to='/decks'>Decks</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;

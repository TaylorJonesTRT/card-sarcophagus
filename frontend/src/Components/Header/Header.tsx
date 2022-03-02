import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className='flex flex-row w-full h-9 justify-around bg-red-400'>
      <h1 className='font-bold w-1/2 m-auto ml-6'>Card Sarcophagus</h1>
      <nav className='w-1/2 m-auto'>
        <ul className="flex flex-row justify-end">
          <li className="mr-6">Cards</li>
          <li className="mr-6">Decks</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;

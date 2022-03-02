import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className='flex flex-row'>
      <h1 className='font-bold basis-1/2'>Card Sarcophagus</h1>
      <nav className='navigation basis-1/2'>
        <ul>
          <li>Cards</li>
          <li>Decks</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;

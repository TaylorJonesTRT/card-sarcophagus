import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <h1 className='logo'>Card Sarcophagus</h1>
      <nav className='navigation'>
        <ul>
          <li>Cards</li>
          <li>Decks</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
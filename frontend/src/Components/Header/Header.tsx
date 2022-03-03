import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='
    flex flex-row w-full h-9 justify-around shadow-xl bg-gradient-to-r 
    from-gray-900 to-gray-700 text-white border-b-2 border-gray-700'
    >
      <h1 className='font-bold w-1/2 m-auto ml-6'>Card Sarcophagus</h1>
      <nav className='w-1/2 m-auto'>
        <ul className="flex flex-row justify-end">
          <li className="mr-6 hover:underline"><Link to='/'>Cards</Link></li>
          <li className="mr-6 hover:underline"><Link to='/decks'>Decks</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';

const Header = (props: any) => {
  const { loggedIn } = props;
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('carsar');
    toast.info('Logging you out', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  return (
    <header
      className='
    w-full mx-auto h-9 justify-around shadow-xl bg-gradient-to-r 
    from-gray-900 to-gray-700 text-white border-b-2 border-gray-700 basis-9'
    >
      <div className='container-lg w-[1240px] flex flex-row mx-auto justify-between pt-1 overflow-hidden flex-grow'>
        <h1 className='font-bold'>
          <Link to='/'>Card Sarcophagus</Link>
        </h1>
        <nav className=''>
          <ul className='flex flex-row justify-end'>
            <li className='mr-6 hover:underline'>
              <Link to='/'>Cards</Link>
            </li>
            {loggedIn && (
              <li
                className='mr-6 hover:underline hover:cursor-pointer'
                onClick={() => handleLogout()}
                onKeyDown={() => handleLogout()}
              >
                Log Out
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

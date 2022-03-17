/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import BottomBar from '../BottomBar';
import Header from '../Header';
import cardBack from '../../Assets/card-back.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const CardArea = () => {
  // create fake card data here (use face down cards just to get stuff working)
  const cardData = [
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
    cardBack,
  ];
  return (
    <ThemeProvider theme={theme}>
      <div className='App w-screen h-screen flex flex-col font-sans'>
        <Header />
        <div className='content h-auto'>
          <ul className='flex flex-row gap-4 flex-wrap m-3 pt-10'>
            <li className='w-28 relative cursor-pointer'>
              <div role='button' tabIndex={0}>
                <Link to='/card-editor'>
                  <img className='shadow' src={cardBack} alt='add-new-card' />
                  <div className='absolute w-full py-16 bottom-0 inset-x-0 text-center text-white'>
                    Add a Card
                  </div>
                </Link>
              </div>
            </li>
            {cardData.map((card: string | undefined) => (
              <li>
                <div role='button' tabIndex={0}>
                  <img className='w-28 shadow' src={card} alt='ygo-card-back' />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <BottomBar />
      </div>
    </ThemeProvider>
  );
};

export default CardArea;

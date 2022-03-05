/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BottomBar from '../BottomBar';
import Header from '../Header';
import cardBack from '../../Assets/card-back.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#000000'
    }
  }
});

const CardArea = () => {
  // create fake card data here (use face down cards just to get stuff working)
  const cardData = [cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack, cardBack];
  return (
    <ThemeProvider theme={theme}>
    <div className='App w-screen h-screen flex flex-col font-sans'>
      <Header />
      <div className='content bg-gray-200 flex-grow'>
        <ul className='flex flex-row gap-4 flex-wrap m-3'>
          {cardData.map((card: string | undefined) => {
            return <li><img className='w-28 shadow' src={card} alt='ygo-card-back' /></li>;
          })}
        </ul>
      </div>
      <BottomBar />
    </div>
    </ThemeProvider>
  );
}

export default CardArea;
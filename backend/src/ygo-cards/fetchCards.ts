/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import Card from '../models/cardModel';

const fetchCards = async () => {
  // TODO: Need to add a clause that if the database version hasn't been updated
  // todo: that the function will not attempt to fetch anymore cards.

  // fetch the YGOPRODECK API
  const ygoCards = await axios
    .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then((response) => response.data.data);

  // iterate through the returned data
  for (let i = 0; i < ygoCards.length; i += 1) {
    // create a new card object with the information from the returned data
    const card = new Card({
      cardId: ygoCards[i].id,
      cardName: ygoCards[i].name,
      cardType: ygoCards[i].type,
      cardLevel: ygoCards[i].level,
      cardAttribute: ygoCards[i].attribute,
      cardRace: ygoCards[i].race,
      cardDesc: ygoCards[i].desc,
      cardAtk: ygoCards[i].atk,
      cardDef: ygoCards[i].def,
      cardImage: ygoCards[i].card_images[0].image_url,
    });

    // Save the card to the database
    card.save((err) => {
      if (err) {
        return console.log(err);
      }
      return console.log(`${card.cardName} saved to the database`);
    });
  }
};

fetchCards();

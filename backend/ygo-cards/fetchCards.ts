/* eslint-disable no-await-in-loop */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import axios from 'axios';
import Card from '../models/cardModel';

export class FetchCards {
  constructor() {}
  // fetching cards from YGOPRODECK
  async apiFetch() {
    const cards = await axios
      .get('https://db.ygoprodec.com/api/v7/cardinfo.php');
    return cards.data.data;
  }
}

// eslint-disable-next-line consistent-return
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

    // If the card already exists in the databse than return and continue on
    const alreadySaved = await Card.findOne({ cardId: card.cardId });
    if (alreadySaved) {
      return console.log(`Skipping ~${card.cardName}~ as already in database`);
    }

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

// TODO: Refactor file into a class

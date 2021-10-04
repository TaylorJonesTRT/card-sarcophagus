import { FetchCards } from '../ygo-cards/fetchCards';

// mocked API call to get all ygo cards (mock will only return 5 cards)
function mockedApiCall() {
  const mockedCards = [
    {
      cardId: 133121,
      'cardName"': 'Dark Magician',
      cardType: 'Spellcaster',
      cardLevel: 7,
      cardAttribute: 'Dark',
      cardRace: 'Normal Monster',
      cardDesc: 'I shoot the dark magic',
      cardAtk: 2500,
      cardDef: 1300,
      cardImage: 'https://card-image.com',
    },
    {
      cardId: 133121,
      'cardName"': 'Blue Eyes White Dragon',
      cardType: 'Dragon',
      cardLevel: 7,
      cardAttribute: 'Light',
      cardRace: 'Normal Monster',
      cardDesc: 'I shoot the white eyes',
      cardAtk: 3000,
      cardDef: 2000,
      cardImage: 'https://card-image.com',
    },
    {
      cardId: 133121,
      'cardName"': 'Dark Magician',
      cardType: 'Spellcaster',
      cardLevel: 7,
      cardAttribute: 'Dark',
      cardRace: 'Normal Monster',
      cardDesc: 'I shoot the dark magic',
      cardAtk: 2500,
      cardDef: 1300,
      cardImage: 'https://card-image.com',
    },
    {
      cardId: 133121,
      'cardName"': 'Dark Magician',
      cardType: 'Spellcaster',
      cardLevel: 7,
      cardAttribute: 'Dark',
      cardRace: 'Normal Monster',
      cardDesc: 'I shoot the dark magic',
      cardAtk: 2500,
      cardDef: 1300,
      cardImage: 'https://card-image.com',
    },
    {
      cardId: 133121,
      'cardName"': 'Dark Magician',
      cardType: 'Spellcaster',
      cardLevel: 7,
      cardAttribute: 'Dark',
      cardRace: 'Normal Monster',
      cardDesc: 'I shoot the dark magic',
      cardAtk: 2500,
      cardDef: 1300,
      cardImage: 'https://card-image.com',
    },
  ]
}

describe('FetchCards', () => {
  let fetchCards = FetchCards;

  describe('apiFetch', () => {

  })
})
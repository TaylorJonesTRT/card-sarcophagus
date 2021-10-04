import { FetchCards } from './fetchCards';

// mocked API call to get all ygo cards (mock will only return 5 cards)
const mockedCards = [
  {
    cardId: 133121,
    cardName: 'Dark Magician',
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
    cardId: 323187,
    cardName: 'Blue Eyes White Dragon',
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
    cardId: 16919454,
    cardName: 'Red Eyes Black Dragon',
    cardType: 'Dragon',
    cardLevel: 7,
    cardAttribute: 'Dark',
    cardRace: 'Normal Monster',
    cardDesc: 'I shoot the red eyes',
    cardAtk: 2700,
    cardDef: 1500,
    cardImage: 'https://card-image.com',
  },
  {
    cardId: 2164947878,
    cardName: "Raider's Knight",
    cardType: 'Warrior',
    cardLevel: 4,
    cardAttribute: 'Dark',
    cardRace: 'Xyz',
    cardDesc: 'I shoot the raider knights',
    cardAtk: 2000,
    cardDef: 0,
    cardImage: 'https://card-image.com',
  },
  {
    cardId: 161919,
    cardName: 'Magikey Mechmortar - Garesglasser',
    cardType: 'Machine',
    cardLevel: 8,
    cardAttribute: 'Earth',
    cardRace: 'Ritual',
    cardDesc: 'I shoot the magikey',
    cardAtk: 2000,
    cardDef: 2800,
    cardImage: 'https://card-image.com',
  },
];
function mockedApiCall() {
  return mockedCards;
}

describe('FetchCards', () => {
  let fetchCards = FetchCards;

  describe('apiFetch', () => {
    test('should pull 5 cards total', async () => {
      expect(mockedApiCall()).toEqual(mockedCards);
    });
    test('Should add cards to an array (database)', () => {
      const database = [...mockedApiCall()];
      expect(database).toEqual(mockedCards);
    });
  });
});
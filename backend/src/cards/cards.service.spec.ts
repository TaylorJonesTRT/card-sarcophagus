import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CardsService } from './cards.service';
import { Card, CardDocument } from './schemas/card.schema';

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
const cardDB: any[] = [];

function mockedApiCall() {
  return mockedCards;
}

function addCard(card) {
  return cardDB.push(card);
}

describe('CardsService', () => {
  let service: CardsService;
  // let mockCardModel: Model<CardDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: getModelToken(Card.name),
          useValue: Model,
        },
      ],
      imports: [HttpModule],
    }).compile();
    // mockCardModel = module.get<Model<CardDocument>>(getModelToken(Card.name));
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch 5 cards', async () => {
    expect(mockedApiCall()).toEqual(mockedCards);
  });

  it('Should push card to the card database', () => {
    const mockedDb = [
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
    ];
    addCard(mockedCards[0]);
    expect(cardDB).toEqual(mockedDb);
  });
});

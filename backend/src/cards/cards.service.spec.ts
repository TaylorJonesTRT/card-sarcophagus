/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test_utils/MongooseTestModule';
import { UsersSchema } from '../users/schemas/users.schema';
import { CardsService } from './cards.service';
import { CardSchema } from './schemas/card.schema';
import { CardInterface } from './interfaces/card.interface';
import { CardDoc } from './interfaces/card-document.interface';

const mockCard = (
  cardId = '133121',
  cardName = 'Dark Magician',
  cardType = 'Spellcaster',
  cardLevel = 7,
  cardAttribute = 'Dark',
  cardRace = 'Normal Monster',
  cardDesc = 'I shoot the dark magic',
  cardAtk = 2500,
  cardDef = 1300,
  cardImage = 'https://card-image.com',
): CardInterface => ({
  cardId,
  cardName,
  cardType,
  cardLevel,
  cardAttribute,
  cardRace,
  cardDesc,
  cardAtk,
  cardDef,
  cardImage,
});

const mockCardDoc = (mock?: Partial<CardInterface>): Partial<CardDoc> => ({
  cardId: mock?.cardId || 'a card id',
  cardName: mock?.cardName || 'Dark Magician',
  cardType: mock?.cardType || 'Spellcaster',
  cardLevel: mock?.cardLevel || 7,
  cardAttribute: mock?.cardAttribute || 'Dark',
  cardRace: mock?.cardRace || 'Normal Monster',
  cardDesc: mock?.cardDesc || 'I shoot the dark magic',
  cardAtk: mock?.cardAtk || 2500,
  cardDef: mock?.cardDef || 1300,
  cardImage: mock?.cardImage || 'https://card-image.com',
});

const cardArray = [
  mockCard(),
  mockCard(
    '323187',
    'Blue-Eyes White Dragon',
    'Dragon',
    7,
    'Light',
    'Normal Monster',
    'I shoot the white eyes',
    3000,
    2000,
    'https://card-image.com',
  ),
  mockCard(
    '16919454',
    'Red Eyes Black Dragon',
    'Dragon',
    7,
    'Dark',
    'Normal Monster',
    'I shoot the red eyes',
    2700,
    1500,
    'https://card-image.com',
  ),
  mockCard(
    '2164947878',
    'Raiders Knight',
    'Warrior',
    4,
    'Dark',
    'Xyz',
    'I shoot the raider knights',
    2000,
    0,
    'https://card-image.com',
  ),
];

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService],
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
        MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
        HttpModule,
      ],
    }).compile();
    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // apiFetch
  it('(Mock)Should return an array of cards', async () => {
    function mockApiCall() {
      const array = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(cardArray);
        }, 300);
      });
      return array;
    }

    expect(await mockApiCall()).toEqual(cardArray);
  });

  // saveCardsToDatabase

  // getOwnedCards

  // getSortedCards

  // getAllCards

  // addOwnedCard

  // updateOwnedCard

  // getSingleCardData

  // removeOwnedCard

  // searchForCards

  // editorSearch

  afterAll(async () => {
    await closeInMongodConnection();
  });
});

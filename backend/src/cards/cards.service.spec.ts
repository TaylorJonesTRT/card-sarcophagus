/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpModule } from '@nestjs/axios';
import {
  getConnectionToken,
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../test_utils/MongooseTestModule';
import { UsersSchema } from '../users/schemas/users.schema';
import { CardsService } from './cards.service';
import { Card, CardDocument, CardSchema } from './schemas/card.schema';
import { CardInterface } from './interfaces/card.interface';
import { CardDoc } from './interfaces/card-document.interface';

const mockCard = (
  id = '133121',
  name = 'Dark Magician',
  type = 'Spellcaster',
  level = 7,
  attribute = 'Dark',
  race = 'Normal Monster',
  desc = 'I shoot the dark magic',
  atk = 2500,
  def = 1300,
  card_images = [
    {
      image_url: 'https://card-image.com',
    },
  ],
) => ({
  id,
  name,
  type,
  level,
  attribute,
  race,
  desc,
  atk,
  def,
  card_images,
});

const cardArray = [
  {
    id: '1',
    name: 'Blue-Eyes White Dragon',
    type: 'Dragon',
    level: 7,
    attribute: 'Light',
    race: 'Normal Monster',
    desc: 'I shoot the white eyes',
    atk: 3000,
    def: 2000,
    card_images: [
      {
        image_url: 'https://card-image.com',
      },
    ],
  },
  {
    id: '2',
    name: 'Blue-Eyes red Dragon',
    type: 'Dragon',
    level: 7,
    attribute: 'Light',
    race: 'Normal Monster',
    desc: 'I shoot the white eyes',
    atk: 3000,
    def: 2000,
    card_images: [
      {
        image_url: 'https://card-image.com',
      },
    ],
  },
  {
    id: '3',
    name: 'Blue-Eyes blue Dragon',
    type: 'Dragon',
    level: 7,
    attribute: 'Light',
    race: 'Normal Monster',
    desc: 'I shoot the white eyes',
    atk: 3000,
    def: 2000,
    card_images: [
      {
        image_url: 'https://card-image.com',
      },
    ],
  },
  {
    id: '4',
    name: 'Blue-Eyes dark Dragon',
    type: 'Dragon',
    level: 7,
    attribute: 'Light',
    race: 'Normal Monster',
    desc: 'I shoot the white eyes',
    atk: 3000,
    def: 2000,
    card_images: [
      {
        image_url: 'https://card-image.com',
      },
    ],
  },
];

describe('CardsService', () => {
  let service: CardsService;
  let model: Model<CardDocument>;
  let connection: Connection;

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
    model = module.get<Model<CardDocument>>(getModelToken(Card.name));
    connection = await module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await connection.close();
    await closeInMongodConnection();
  });

  describe('YGOProDeck and DB Loading', () => {
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
    it('(Mock)Should save cards to DB', async () => {
      await service.saveCardsToDatabase(cardArray);
      expect(await model.find().then((response) => response.length)).toEqual(
        cardArray.length,
      );
    });

    // getOwnedCards

    // getSortedCards

    // getAllCards

    // addOwnedCard

    // updateOwnedCard

    // getSingleCardData

    // removeOwnedCard

    // searchForCards

    // editorSearch
  });
});

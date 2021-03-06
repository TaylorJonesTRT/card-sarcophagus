import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';
import { Card } from '../cards/schemas/card.schema';
import { Users } from './../users/schemas/users.schema';

describe('DecksController', () => {
  let controller: DecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecksController],
      providers: [
        DecksService,
        {
          provide: getModelToken(Deck.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Card.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Users.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<DecksController>(DecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';
import { Card } from '../cards/schemas/card.schema';

describe('DecksService', () => {
  let service: DecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<DecksService>(DecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

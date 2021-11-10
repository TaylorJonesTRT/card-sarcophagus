import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './schemas/card.schema';

describe('CardsController', () => {
  let controller: CardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      imports: [HttpModule],
      providers: [
        CardsService,
        {
          provide: getModelToken(Card.name),
          useValue: Model,
        },
      ],
    }).compile();
    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { HttpModule } from '@nestjs/axios';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CardsController } from './cards.controller';
import { CardsModule } from './cards.module';
import { CardsService } from './cards.service';
import { CardSchema } from './schemas/card.schema';
import { Card, CardDocument } from './schemas/card.schema';

describe('CardsController', () => {
  let controller: CardsController;
  let mockCardModel: Model<CardDocument>;

  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
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
    mockCardModel = module.get<Model<CardDocument>>(getModelToken(Card.name));
    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

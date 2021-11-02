import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from './cards.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardSchema } from './schemas/card.schema';
import { CardsController } from './cards.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'OwnedCards', schema: CardSchema },
    ]),
    HttpModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

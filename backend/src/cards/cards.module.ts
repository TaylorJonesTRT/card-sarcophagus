/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsService } from './cards.service';
import { Card, CardSchema } from './schemas/card.schema';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { CardsController } from './cards.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    HttpModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

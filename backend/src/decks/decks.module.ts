import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { DeckSchema } from './schemas/deck.schema';
import { CardSchema } from '../cards/schemas/card.schema';
import { UsersSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
  ],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService],
})
export class DecksModule {}

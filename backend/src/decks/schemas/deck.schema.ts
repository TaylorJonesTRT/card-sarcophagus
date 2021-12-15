import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeckDocument = Deck & Document;

@Schema()
export class Deck {
  @Prop()
  deckName: string;

  @Prop()
  mainDeck: number[];

  @Prop()
  extraDeck: number[];

  @Prop()
  sideDeck: number[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

export type DeckDocument = Deck & Document;

@Schema()
export class Deck {
  @Prop([{ type: SchemaTypes.ObjectId, ref: 'Card' }])
  mainDeck: Types.ObjectId[];
}

export const DeckSchema = SchemaFactory.createForClass(Deck);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeckDocument = Deck & Document;

@Schema()
export class Deck {
  @Prop()
  deckName: string;

  @Prop({ type: Map })
  mainDeck = new Map<string, number>();

  @Prop({ type: Map })
  extraDeck = new Map<string, number>();

  @Prop({ type: Map })
  sideDeck = new Map<string, number>();
}

export const DeckSchema = SchemaFactory.createForClass(Deck);

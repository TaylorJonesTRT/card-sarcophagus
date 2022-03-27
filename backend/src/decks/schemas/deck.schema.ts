import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Users' })
  deckOwner: Types.ObjectId;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);

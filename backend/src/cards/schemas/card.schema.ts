import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop()
  cardId: number;

  @Prop()
  cardName: string;

  @Prop()
  cardType: string;

  @Prop()
  cardLevel: number;

  @Prop()
  cardAttribute: string;

  @Prop()
  cardRace: string;

  @Prop()
  cardDesc: string;

  @Prop()
  cardAtk: number;

  @Prop()
  cardDef: number;

  @Prop()
  cardImage: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  cardId: number;

  @Prop({ required: true })
  cardName: string;

  @Prop({ required: true })
  cardType: string;

  @Prop()
  cardLevel: number;

  @Prop()
  cardAttribute: string;

  @Prop({ required: true })
  cardRace: string;

  @Prop({ required: true })
  cardDesc: string;

  @Prop()
  cardAtk: number;

  @Prop()
  cardDef: number;

  @Prop({ required: true })
  cardImage: string;

  @Prop({ required: true, default: false })
  owned: boolean;

  @Prop({ required: true, default: 0 })
  amountOfCopies: number;

  @Prop({ required: true, default: 0 })
  availableCopies: number;

  @Prop({ required: false })
  boxLocation: string;

  @Prop({ required: false })
  binderLocation: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ cardName: 'text' });

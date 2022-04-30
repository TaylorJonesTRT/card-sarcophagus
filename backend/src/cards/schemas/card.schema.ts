import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  cardId: string;

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
}

export const CardSchema = SchemaFactory.createForClass(Card);
CardSchema.index({ cardName: 'text' });

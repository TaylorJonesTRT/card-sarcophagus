import { Document } from 'mongoose';

export interface CardDoc extends Document {
  cardId: string;
  cardName: string;
  cardType: string;
  cardLevel: number;
  cardAttribute: string;
  cardRace: string;
  cardDesc: string;
  cardAtk: number;
  cardDef: number;
  cardImage: string;
}

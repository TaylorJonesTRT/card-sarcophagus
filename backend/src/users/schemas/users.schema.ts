import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Card' }])
  ownedCards: [Types.ObjectId];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Deck' }])
  decks: [Types.ObjectId];
}

export const UsersSchema = SchemaFactory.createForClass(Users);

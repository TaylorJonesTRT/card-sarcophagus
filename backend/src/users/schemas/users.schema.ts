/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: Object }])
  ownedCards: Record<string, unknown>;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Deck' }])
  decks: [Types.ObjectId];

  @Prop({ default: 0 })
  jwtId: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre<Users>('save', async function () {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  // modify property on this
  this.password = hashedPassword;
});

/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UsersDocument = Users & Document;

const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

@Schema()
export class Users {
  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({
    required: true,
    minlength: 8,
    match: passwordRegex,
  })
  password: string;

  @Prop([{ type: Array }])
  ownedCards: any[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Deck' }])
  decks: [Types.ObjectId];

  @Prop({ default: 0 })
  jwtId: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre<UsersDocument>('save', async function () {
  if (!this.isModified('password')) return;
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  // modify property on this
  this.password = hashedPassword;
});

UsersSchema.index({ ownedCards: 'text' });

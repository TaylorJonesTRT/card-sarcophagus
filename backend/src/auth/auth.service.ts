/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {}

  async createUser(email: string, password: string) {
    const alreadyCreated = await this.usersModel.findOne({ email });

    if (alreadyCreated) {
      return { error: 'An account already exists with that email' };
    }

    const newUser = new this.usersModel({
      email,
      password,
    });

    newUser.save((err) => {
      if (err) {
        return console.log(err);
      }
    });
    return { message: 'Account Created!' };
  }
}

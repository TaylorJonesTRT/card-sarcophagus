/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Users, UsersDocument } from '../users/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersModel.findOne({ email: username });
      if (!user) {
        return null;
      }
      const validatePassword = await bcrypt.compare(pass, user.password);
      if (user && validatePassword) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      console.log(err);
    }
  }

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

  async login(user: any) {
    try {
      const activeUser = await this.usersModel.findOne({ _id: user._doc._id });
      if (!activeUser) {
        throw new Error('No user found with that email');
      }
      activeUser.jwtId += 1;
      activeUser.save((err) => {
        if (err) {
          return console.log(err);
        }
      });
      const payload = {
        email: user._doc.email,
        sub: user._doc._id,
        ownedCards: user._doc.ownedCards,
        decks: user._doc.decks,
        jwtId: activeUser.jwtId,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      console.error(err);
    }
  }
}

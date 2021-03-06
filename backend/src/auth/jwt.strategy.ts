/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../users/schemas/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.usersModel.findOne({ _id: payload.sub });

    if (payload.jwtId !== user.jwtId) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub,
      username: payload.email,
      ownedCards: user.ownedCards,
      decks: user.decks,
    };
  }
}

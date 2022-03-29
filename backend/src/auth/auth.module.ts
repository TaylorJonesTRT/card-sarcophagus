/* eslint-disable @typescript-eslint/no-this-alias */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: 'Users',
        useFactory: () => {
          const schema = UsersSchema;
          schema.pre<Users>('save', async function () {
            const user = this;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

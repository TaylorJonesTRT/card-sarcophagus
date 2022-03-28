import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { HttpModule } from '@nestjs/axios';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    CardsModule,
    HttpModule,
    DecksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

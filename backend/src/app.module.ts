import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { HttpModule } from '@nestjs/axios';
import { CardsService } from './cards/cards.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://revtastic:0r3g0n@card-sarcophagus.lf2te.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    CardsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

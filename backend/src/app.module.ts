import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/card-sarcophagus')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

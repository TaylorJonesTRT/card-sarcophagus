import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  showAllDecks(@Req() request: Request) {
    return this.decksService.showAllDecks(request);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getDeck(@Param('id') deckId: number, @Req() request: Request) {
    return this.decksService.getDeckById(deckId, request);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createNewDeck(@Body('deckName') deckName: string, @Req() request: Request) {
    return this.decksService.createDeck(deckName, request);
  }

  @Put('')
  updateDeck(
    @Body('deckId') deckId: number,
    @Body('cardId') cardId: string,
    @Body('amountOfCopies') amountOfCopies: number,
    @Body('deckLocation') deckLocation: string,
    @Body('cardRemoval') cardRemoval: boolean,
  ) {
    return this.decksService.updateDeck(
      deckId,
      cardId,
      amountOfCopies,
      deckLocation,
      cardRemoval,
    );
  }

  @Delete('')
  removeDeck(@Body('id') id: number) {
    return this.decksService.removeDeck(id);
  }
}

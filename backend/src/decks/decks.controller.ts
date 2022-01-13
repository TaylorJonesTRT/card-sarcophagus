import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  showAllDecks() {
    return this.decksService.showAllDecks();
  }

  @Get(':id')
  getDeck(@Param('id') deckId: number) {
    return this.decksService.getDeckById(deckId);
  }

  @Post()
  createNewDeck(@Body('deckName') deckName: string) {
    return this.decksService.createDeck(deckName);
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

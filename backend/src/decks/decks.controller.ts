import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  showAllDecks() {
    return this.decksService.showAllDecks();
  }

  @Get('')
  getDeck() {
    return 'Not implemented yet';
  }

  @Post()
  createNewDeck(@Body('deckName') deckName: string) {
    return this.decksService.createDeck(deckName);
  }

  @Put(':id')
  updateDeck(
    @Body('deckId') deckId: number,
    @Body('cardId') cardId: number,
    @Body('deckLocation') deckLocation: string,
    @Body('cardRemoval') cardRemoval: boolean,
  ) {
    return this.decksService.updateDeck(
      deckId,
      cardId,
      deckLocation,
      cardRemoval,
    );
  }

  @Delete(':id')
  removeDeck(@Body('id') id: number) {
    return this.decksService.removeDeck(id);
  }
}

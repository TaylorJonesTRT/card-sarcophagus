import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  showAllDecks() {
    return this.decksService.showAllDecks();
  }

  @Get(':id')
  getDeck() {
    return 'Not implemented yet';
  }

  @Post()
  createNewDeck(@Body('deckName') deckName: string) {
    return this.decksService.createDeck(deckName);
  }

  @Put(':id')
  updateDeck() {
    return 'Not implemented yet';
  }

  @Delete(':id')
  removeDeck() {
    return 'Not implemented yet';
  }
}

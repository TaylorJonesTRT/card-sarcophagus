import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  showAllDecks() {
    return 'Not implemented yet';
  }

  @Get(':id')
  getDeck() {
    return 'Not implemented yet';
  }

  @Post()
  createNewDeck() {
    return 'Not implemented yet';
  }

  @Put()
  updateDeck() {
    return 'Not implemented yet';
  }

  @Delete(':id')
  removeDeck() {
    return 'Not implemented yet';
  }
}

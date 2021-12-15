import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('update-database')
  updateCardDatabase() {
    return this.cardsService.saveCardsToDatabase();
  }

  @Get()
  getOwnedCards() {
    return this.cardsService.getOwnedCards();
  }

  @Get('all-cards')
  getAllCards() {
    return this.cardsService.getAllCards();
  }

  @Post()
  addOrUpdateCard(
    @Body('cardId') cardId: number,
    @Body('amountOfCopies') copies: number,
    @Body('owned') owned: boolean,
    @Body('binderLocation') binderLocation: string,
    @Body('boxLocation') boxLocation: string,
  ) {
    return this.cardsService.addOrUpdateCard(
      cardId,
      copies,
      owned,
      binderLocation,
      boxLocation,
    );
  }
}

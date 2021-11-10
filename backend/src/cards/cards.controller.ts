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

  @Post()
  addOwnedCard(
    @Body('cardId') cardId: number,
    @Body('amountOfCopies') copies: number,
    @Body('owned') owned: boolean,
  ) {
    return this.cardsService.addCard(cardId, copies, owned);
  }
}

import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Req,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('update-database')
  updateCardDatabase() {
    return this.cardsService.saveCardsToDatabase();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOwnedCards(@Req() request: Request) {
    return this.cardsService.getOwnedCards(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sorted')
  getSortedCards(
    @Req() request: Request,
    @Body('sortOption') sortOption = 'cardName',
  ) {
    return this.cardsService.getSortedCards(request.user, sortOption);
  }

  @Get('all-cards')
  getAllCards() {
    return this.cardsService.getAllCards();
  }

  @UseGuards(JwtAuthGuard)
  @Get('testing')
  testFunction(@Req() request: Request) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addOwnedCard(
    @Req() request: Request,
    @Body('cardId') cardId: string,
    @Body('amountOfCopies') amountOfCopies: number,
    @Body('availableCopies') availableCopies: number,
    @Body('binderLocation') binderLocation: string,
    @Body('boxLocation') boxLocation: string,
  ) {
    return this.cardsService.addOwnedCard(
      request.user,
      cardId,
      amountOfCopies,
      availableCopies,
      binderLocation,
      boxLocation,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateOwnedCard(
    @Req() request: Request,
    @Body('cardId') cardId: string,
    @Body('amountOfCopies') copies: number,
    @Body('availableCopies') availableCopies: number,
    @Body('binderLocation') binderLocation: string,
    @Body('boxLocation') boxLocation: string,
  ) {
    return this.cardsService.updateOwnedCard(
      request.user,
      cardId,
      copies,
      availableCopies,
      binderLocation,
      boxLocation,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeOwnedCard(@Req() request: Request, @Body('cardId') cardId: string) {
    return this.cardsService.removeOwnedCard(request.user, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('card')
  getCardData(@Req() request: Request, @Body('cardId') cardId: number) {
    return this.cardsService.getSingleCardData(request.user, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('search')
  searchForCards(@Req() request: Request, @Body('cardName') cardName: string) {
    return this.cardsService.searchForCards(request.user, cardName);
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersDocument } from '../users/schemas/users.schema';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class CardsService {
  constructor(
    private httpService: HttpService,
    @InjectModel('Card') private readonly cardModel: Model<CardDocument>,
    @InjectModel('Users') private readonly usersModel: Model<UsersDocument>,
  ) {}

  async apiFetch() {
    const dataFetch = await lastValueFrom(
      this.httpService
        .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        .pipe(map((response) => response.data.data)),
    );
    return dataFetch;
  }

  async saveCardsToDatabase() {
    const cards = await this.apiFetch();

    for (let i = 0; i < cards.length; i += 1) {
      const newCard = new this.cardModel({
        cardId: cards[i].id,
        cardName: cards[i].name,
        cardType: cards[i].type,
        cardLevel: cards[i].level,
        cardAttribute: cards[i].attribute,
        cardRace: cards[i].race,
        cardDesc: cards[i].desc,
        cardAtk: cards[i].atk,
        cardDef: cards[i].def,
        cardImage: cards[i].card_images[0].image_url,
        owned: false,
        amountOfCopies: 0,
        availableCopies: 0,
        boxLocation: null,
        binderLocation: null,
      });
      const alreadySaved = await this.cardModel.findOne({
        cardId: cards[i].id,
      });
      if (alreadySaved) {
        console.log(
          `\x1b[41m`,
          `Skipping ~${cards[i].name}~ as already in database`,
        );
        continue;
      }
      // Save the card to the Mongo Database
      newCard.save((err) => {
        if (err) {
          return console.log(err);
        }
        return console.log(
          `\x1b[32m`,
          `${newCard.cardName} saved to the database`,
        );
      });
    }
    return 'Adding cards to database, check your console';
  }

  async getOwnedCards(user: any) {
    const ownedCards = user.ownedCards;
    return ownedCards;
  }

  async getAllCards() {
    const cards = await this.cardModel.find().sort({ cardName: 1 });
    return cards;
  }

  async addOwnedCard(
    reqUser: any,
    cardId: string,
    amountOfCopies: number,
    availableCopies: number,
    binderLocation: string,
    boxLocation: string,
  ) {
    const user = await this.usersModel.findOne({ email: reqUser.username });
    user.ownedCards[0][cardId] = {};
    user.ownedCards[0][cardId].amountOfCopies = amountOfCopies;
    user.ownedCards[0][cardId].availableCopies = availableCopies;
    user.ownedCards[0][cardId].binderLocation = binderLocation;
    user.ownedCards[0][cardId].boxLocation = boxLocation;
    console.log(user.ownedCards[0]);
    user.markModified('ownedCards');
    user.save((err) => {
      if (err) return console.log(err);
    });
    return { message: 'Card added to collection!' };
  }

  async updateOwnedCard(
    reqUser,
    cardId: string,
    amountOfCopies: number,
    availableCopies: number,
    binderLocation: string,
    boxLocation: string,
  ) {
    const user = await this.usersModel.findOne({ email: reqUser.username });
    user.ownedCards[0][cardId].amountOfCopies = amountOfCopies;
    user.ownedCards[0][cardId].availableCopies = availableCopies;
    user.ownedCards[0][cardId].binderLocation = binderLocation;
    user.ownedCards[0][cardId].boxLocation = boxLocation;
    user.markModified('ownedCards');

    user.save((err) => {
      if (err) return console.log(err);
    });
    return { message: 'Card has been updated in your collection!' };
  }

  async getSingleCardData(cardId: number) {
    const card = await this.cardModel.find({ cardId });
    return card;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
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
      });
      const alreadySaved = await this.cardModel.findOne({
        cardId: cards[i].id,
      });
      if (alreadySaved) {
        console.log(
          `\x1b[41m`,
          `Skipping ~${cards[i].name}~ was already in database`,
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

  async getOwnedCards(reqUser: any) {
    const activeUser = await this.usersModel.findOne({
      email: reqUser.username,
    });
    return { activeUser };
  }

  async getSortedCards(reqUser: any, sortOption = 'cardName') {
    const activeUser = await this.usersModel.findOne({
      email: reqUser.username,
    });
    let sortedCards = _.orderBy(
      activeUser.ownedCards[0],
      [(item) => (item[sortOption] ? item[sortOption] : ''), 'cardName'],
      ['desc', 'desc'],
    );
    if (sortOption === 'cardType') {
      sortedCards = _.orderBy(
        activeUser.ownedCards[0],
        [(item) => (item[sortOption] ? item[sortOption] : ''), 'cardName'],
        ['asc', 'desc'],
      );
    }
    const sortedArray = [];
    sortedArray[0] = sortedCards;
    return { sortedArray };
  }

  async getAllCards() {
    const cards = await this.cardModel.find().sort({ cardName: 1 });
    return { cards };
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
    const card = await this.cardModel.findOne({ cardId });
    user.ownedCards[0][card.cardName] = {};
    user.ownedCards[0][card.cardName].cardName = card.cardName;
    user.ownedCards[0][card.cardName].amountOfCopies = amountOfCopies;
    user.ownedCards[0][card.cardName].availableCopies = availableCopies;
    user.ownedCards[0][card.cardName].binderLocation = binderLocation;
    user.ownedCards[0][card.cardName].boxLocation = boxLocation;
    user.ownedCards[0][card.cardName].cardImage = card.cardImage;
    user.ownedCards[0][card.cardName].owned = true;
    user.ownedCards[0][card.cardName].cardId = card.cardId;
    user.ownedCards[0][card.cardName].cardLevel = card.cardLevel;
    user.ownedCards[0][card.cardName].cardAttribute = card.cardAttribute;
    user.ownedCards[0][card.cardName].cardRace = card.cardRace;
    user.ownedCards[0][card.cardName].cardType = card.cardType;
    user.ownedCards[0][card.cardName].cardDesc = card.cardDesc;
    user.ownedCards[0][card.cardName].cardAtk = card.cardAtk;
    user.ownedCards[0][card.cardName].cardDef = card.cardDef;

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
    const card = await this.cardModel.findOne({ cardId });
    user.ownedCards[0][card.cardName].amountOfCopies = amountOfCopies;
    user.ownedCards[0][card.cardName].availableCopies = availableCopies;
    user.ownedCards[0][card.cardName].binderLocation = binderLocation;
    user.ownedCards[0][card.cardName].boxLocation = boxLocation;
    user.markModified('ownedCards');

    user.save((err) => {
      if (err) return console.log(err);
    });
    return { message: 'Card has been updated in your collection!' };
  }

  async getSingleCardData(reqUser: any, cardId: number) {
    const cardFetch = await this.cardModel.findOne({ cardId });
    return { cardFetch };
  }

  async removeOwnedCard(reqUser, cardId: string) {
    const activeUser = await this.usersModel.findOne({
      email: reqUser.username,
    });
    delete activeUser.ownedCards[0][cardId];
    activeUser.markModified('ownedCards');
    activeUser.save((err) => {
      if (err) return console.log(err);
    });
    return activeUser.ownedCards[0];
  }

  async searchForCards(reqUser: any, cardNameString: string) {
    const activeUser = await this.usersModel.findOne({
      email: reqUser.username,
    });
    const store = [];
    const searchedCards = Object.entries(activeUser.ownedCards[0]).filter(
      ([key, value]) => key.toLowerCase().includes(cardNameString),
    );
    store[0] = Object.fromEntries(searchedCards);
    return { store };
  }
}

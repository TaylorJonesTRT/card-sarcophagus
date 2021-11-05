import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class CardsService {
  constructor(
    private httpService: HttpService,
    @InjectModel('Card') private readonly cardModel: Model<CardDocument>,
  ) {}

  // TODO: Finish the below method later on so that I don't have to keep
  // todo: pulling every single card from the API.
  // checkDBVersion() {
  //   let cardDbVersion = this.httpService
  //     .get('https://db.ygoprodeck.com/api/v7/checkDBVer.php')
  //     .pipe(map((response) => response.data));
  // }

  async apiFetch() {
    const dataFetch = await lastValueFrom(
      this.httpService
        .get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
        .pipe(map((response) => response.data.data)),
    );
    return dataFetch;
  }

  async databaseLength() {
    const cards = await this.apiFetch();
    console.log('hi');
    // return cards.length;
    return 'hi';
  }

  async showDbVersion() {
    const databaseVersion = this.httpService
      .get('https://db.ygoprodeck.com/api/v7/checkDBVer.php')
      .pipe(
        map((response) => {
          return response.data[0].database_version;
        }),
      );
    return databaseVersion;
  }

  async saveCardsToDatabase() {
    const cards = await this.apiFetch();

    for (let i = 0; i < cards.length; i += 1) {
      // If the card is located in the database than it does not need to be
      // added again.

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
      });
      const alreadySaved = await this.cardModel.findOne({
        cardId: cards[i].id,
      });
      if (alreadySaved) {
        return console.log(
          `\x1b[41m`,
          `Skipping ~${cards[i].name}~ as already in database`,
        );
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

  async addCard(cardId: number, copies: number, owned: boolean) {
    const filter = { cardId };
    const cardInformation = {
      owned,
      amountOfCopies: copies,
    };
    const card = await this.cardModel.findOneAndUpdate(filter, cardInformation);
    return card;
  }
}

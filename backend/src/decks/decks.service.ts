/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from 'src/cards/schemas/card.schema';
import { Deck, DeckDocument } from './schemas/deck.schema';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<DeckDocument>,
    @InjectModel('Card') private readonly cardModel: Model<CardDocument>,
  ) {}

  async createDeck(deckName: string) {
    const deck = new this.deckModel({
      deckName,
      mainDeck: [],
      extraDeck: [],
      sideDeck: [],
    });

    const alreadySaved = await this.deckModel.findOne({
      deckName,
    });

    if (alreadySaved) {
      return { message: 'A deck with that name already exists' };
    }

    deck.save((err) => {
      if (err) {
        return console.log(err);
      }
      return { message: 'Deck successfully created!' };
    });
  }

  async showAllDecks() {
    return await this.deckModel.find().sort({ deckName: 1 });
  }

  async removeDeck(deckId: number) {
    return await this.deckModel.deleteOne({ _id: deckId });
  }

  async updateDeck(
    deckId: number,
    cardId: number,
    deckLocation: string,
    cardRemoval: boolean,
  ) {
    const deck = await this.deckModel.findOne({ _id: deckId });

    if (cardRemoval) {
      if (deckLocation == 'mainDeck') {
        deck.mainDeck.filter((card) => card != cardId);
      } else if (deckLocation == 'extraDeck') {
        deck.extraDeck.filter((card) => card != cardId);
      } else if (deckLocation == 'sideDeck') {
        deck.sideDeck.filter((card) => card != cardId);
      }
    }

    if (deckLocation == 'mainDeck') {
      deck.mainDeck.push(cardId);
    } else if (deckLocation == 'extraDeck') {
      deck.extraDeck.push(cardId);
    } else if (deckLocation == 'sideDeck') {
      deck.sideDeck.push(cardId);
    }

    deck.save((err) => {
      if (err) {
        return console.error(err);
      }
    });
  }

  async getDeck(deckId: number) {
    const deckData = {
      mainDeck: [],
      extraDeck: [],
      sideDeck: [],
    };
    const deck = this.deckModel.findById(deckId);

    if (!deck) {
      throw Error('No deck could be found');
    }

    for (let i = 0; i < (await deck).mainDeck.length; i += 1) {
      const cardId = (await deck).mainDeck[i];
      const card = await this.cardModel.findOne({ cardId });
      deckData.mainDeck.push(card);
    }
    for (let i = 0; i < (await deck).extraDeck.length; i += 1) {
      const cardId = (await deck).extraDeck[i];
      const card = await this.cardModel.findOne({ cardId });
      deckData.extraDeck.push(card);
    }
    for (let i = 0; i < (await deck).sideDeck.length; i += 1) {
      const cardId = (await deck).sideDeck[i];
      const card = await this.cardModel.findOne({ cardId });
      deckData.sideDeck.push(card);
    }

    return deckData;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck, DeckDocument } from './schemas/deck.schema';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<DeckDocument>,
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
}

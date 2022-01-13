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
    cardId: string,
    amountOfCopies: number,
    deckLocation: string,
    cardRemoval: boolean,
  ) {
    const deck = await this.deckModel.findOne({ _id: deckId });

    if (!deck) {
      throw Error('No deck couild found by that deckId!');
    }

    if (cardRemoval) {
      if (deckLocation == 'mainDeck') {
        deck.mainDeck.set(cardId, deck.mainDeck.get(cardId) - amountOfCopies);
        return deck.save();
      } else if (deckLocation == 'extraDeck') {
        deck.extraDeck.set(cardId, deck.extraDeck.get(cardId) - amountOfCopies);
        return deck.save();
      } else {
        deck.sideDeck.set(cardId, deck.sideDeck.get(cardId) - amountOfCopies);
        return deck.save();
      }
    } else {
      if (deckLocation == 'mainDeck') {
        deck.mainDeck.set(cardId, deck.mainDeck.get(cardId) + amountOfCopies);
        return deck.save();
      } else if (deckLocation == 'extraDeck') {
        deck.extraDeck.set(cardId, deck.extraDeck.get(cardId) + amountOfCopies);
        return deck.save();
      } else {
        deck.sideDeck.set(cardId, deck.sideDeck.get(cardId) + amountOfCopies);
        return deck.save();
      }
    }
  }

  async getDeckById(deckId: number) {
    const deckData = {
      mainDeck: {},
      extraDeck: {},
      sideDeck: {},
    };
    const deck = await this.deckModel.findById(deckId);

    if (!deck) {
      throw Error('No deck could be found by that deckId');
    }

    deckData.mainDeck = deck.mainDeck;
    deckData.extraDeck = deck.extraDeck;
    deckData.sideDeck = deck.sideDeck;

    return deckData;
  }
}

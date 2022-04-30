/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../cards/schemas/card.schema';
import { Deck, DeckDocument } from './schemas/deck.schema';

@Injectable()
export class DecksService {
  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<DeckDocument>,
    @InjectModel('Card') private readonly cardModel: Model<CardDocument>,
  ) {}

  async createDeck(deckName: string, reqUser: any) {
    const deck = new this.deckModel({
      deckName,
      mainDeck: [],
      extraDeck: [],
      sideDeck: [],
      deckOwner: reqUser.user.userId,
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
    });
    return { message: 'Deck created!' };
  }

  async showAllDecks(request) {
    const allDecks = await this.deckModel.find({
      deckOwner: request.user.userId,
    });
    return { allDecks };
  }

  async removeDeck(request: any, deckId: number) {
    // TODO: Need to implement logic so that any cards in a deck go back to pile
    const deck = await this.deckModel.deleteOne({
      deckOwner: request.user.userId,
      _id: deckId,
    });
    return { deck };
  }

  async updateDeck(
    request: any,
    deckId: number,
    cardId: string,
    amountOfCopies: number,
    deckLocation: string,
    cardRemoval: boolean,
  ) {
    const deck = await this.deckModel.findOne({
      deckOwner: request.user.userId,
      _id: deckId,
    });

    if (!deck) {
      throw Error('No deck couild found by that deckId!');
    }

    if (cardRemoval) {
      if (deckLocation == 'mainDeck') {
        deck.mainDeck.set(cardId, deck.mainDeck.get(cardId) - amountOfCopies);
        deck.save();
      } else if (deckLocation == 'extraDeck') {
        deck.extraDeck.set(cardId, deck.extraDeck.get(cardId) - amountOfCopies);
        deck.save();
      } else {
        deck.sideDeck.set(cardId, deck.sideDeck.get(cardId) - amountOfCopies);
        deck.save();
      }
    } else {
      if (deckLocation == 'mainDeck') {
        deck.mainDeck.set(cardId, amountOfCopies);
        deck.save();
      } else if (deckLocation == 'extraDeck') {
        deck.extraDeck.set(cardId, amountOfCopies);
        deck.save();
      } else {
        deck.sideDeck.set(cardId, amountOfCopies);
        deck.save();
      }
    }
    return { message: 'Deck updated successfully!' };
  }

  async getDeckById(deckId: number, request: any) {
    const deckData = {
      mainDeck: {},
      extraDeck: {},
      sideDeck: {},
    };

    try {
      const deck = await this.deckModel.findOne({
        deckOwner: request.user.userId,
        _id: deckId,
      });

      if (!deck) {
        throw Error('No deck could be found by that deckId');
      }

      deckData.mainDeck = deck.mainDeck;
      deckData.extraDeck = deck.extraDeck;
      deckData.sideDeck = deck.sideDeck;
    } catch (err) {
      throw Error('Error');
    }

    return { deckData };
  }
}

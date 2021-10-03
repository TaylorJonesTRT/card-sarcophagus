import mongoose from 'mongoose';

const { Schema } = mongoose;

const CardSchema = new Schema({
  _id: Number,
  cardId: { type: Number, required: true },
  cardName: { type: String, required: true },
  cardType: { type: String, required: true },
  cardLevel: { type: Number, required: false },
  cardAttribute: { type: String, required: false },
  cardRace: { type: String, required: true },
  cardDesc: { type: String, required: true },
  cardAtk: { type: Number, required: false },
  cardDef: { type: Number, required: false },
  cardImage: { type: String, required: true },
});

export default mongoose.model('Card', CardSchema);

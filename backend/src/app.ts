import express from 'express';
import mongoose from 'mongoose';
// import middleware from './middlewares';

require('dotenv').config();

const app = express();

if (!process.env.MONGO_URL) {
  process.exit(1);
}
const mongoDBUrl = process.env.MONGO_URL;
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Card Sarcophagus Backend' });
});

// app.use(middleware.notFound);
// app.use(middleware.errorHandler);

// export default app;
module.exports = app;

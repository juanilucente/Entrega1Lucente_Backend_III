const { Schema, model } = require('mongoose');

const petSchema = new Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Pet', petSchema);
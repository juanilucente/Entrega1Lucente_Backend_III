const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  resetToken: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('User', userSchema);
const mongoose = require('mongoose');

module.exports = async function connectDB(uri){
  if(!uri) throw new Error('MONGO_URI not provided');
  await mongoose.connect(uri, { dbName: 'entrega1' });
  console.log('MongoDB connected');
}
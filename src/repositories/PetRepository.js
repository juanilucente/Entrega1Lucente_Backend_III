const Pet = require('../models/Pet');

class PetRepository {
  static async create(data){ return new Pet(data).save(); }
  static async insertMany(arr){ return Pet.insertMany(arr); }
  static async findAll(){ return Pet.find().lean(); }
  static async findById(id){ return Pet.findById(id).lean(); }
}

module.exports = PetRepository;
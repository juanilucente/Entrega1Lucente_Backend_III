const User = require('../models/User');

class UserRepository {
  static async create(userData){ 
    const user = new User(userData);
    return user.save();
  }

  static async findByEmail(email){
    return User.findOne({ email }).lean();
  }

  static async findById(id){
    return User.findById(id).lean();
  }

  static async updateById(id, update){
    return User.findByIdAndUpdate(id, update, { new: true }).lean();
  }

  static async deleteById(id){
    return User.findByIdAndDelete(id);
  }

  static async findAll(){
    return User.find().lean();
  }

  static async insertMany(arr){
    
    return User.insertMany(arr);
  }
}

module.exports = UserRepository;

const User = require('../models/User');
const UserRepository = require('./UserRepository');

UserRepository.findByResetToken = async function(token){
  return User.findOne({ resetToken: token }).lean();
};

module.exports = UserRepository;
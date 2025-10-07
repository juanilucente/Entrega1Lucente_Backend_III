const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const existing = await UserRepository.findByEmail(email);
    if(existing) return res.status(409).json({ error: 'User already exists' });
    const hash = await bcrypt.hash(password, saltRounds);
    const created = await UserRepository.create({ firstName, lastName, email, password: hash, role });
    return res.status(201).json(new UserDTO(created));
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserRepository.findById(id);
    if(!user) return res.status(404).json({ error: 'User not found' });
    return res.json(new UserDTO(user));
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await UserRepository.findAll();
    const out = users.map(u => new UserDTO(u));
    return res.json(out);
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    if(update.password){
      update.password = await bcrypt.hash(update.password, saltRounds);
    }
    const updated = await UserRepository.updateById(id, update);
    if(!updated) return res.status(404).json({ error: 'User not found' });
    return res.json(new UserDTO(updated));
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserRepository.deleteById(id);
    return res.status(204).send();
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
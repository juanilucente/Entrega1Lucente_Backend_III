const PetRepository = require('../repositories/PetRepository');

exports.listPets = async (req, res) => {
  try {
    const pets = await PetRepository.findAll();
    return res.json(pets);
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.createPet = async (req, res) => {
  try {
    const pet = await PetRepository.create(req.body);
    return res.status(201).json(pet);
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
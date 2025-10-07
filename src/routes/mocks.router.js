const express = require('express');
const router = express.Router();
const { generateUsers, generatePets } = require('../services/mocking.service');
const UserRepository = require('../repositories/UserRepository');
const PetRepository = require('../repositories/PetRepository');


router.get('/mockingpets', (req, res) => {
  const count = Number(req.query.count) || 10;
  const pets = generatePets(count);
  return res.json(pets);
});


router.get('/mockingusers', async (req, res) => {
  const count = Number(req.query.count) || 50;
  const users = await generateUsers(count);
  
  const out = users.map(u => ({ ...u, _id: String(u._id) }));
  return res.json(out);
});


router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;
    const created = { users: 0, pets: 0 };

    if(Number(users) > 0){
      const us = await generateUsers(Number(users));
      
      const docs = us.map(u => {
        const copy = { ...u };
        
        return copy;
      });
      const inserted = await UserRepository.insertMany(docs);
      created.users = inserted.length;
    }

    if(Number(pets) > 0){
      const ps = generatePets(Number(pets));
      const inserted = await PetRepository.insertMany(ps);
      created.pets = inserted.length;
    }

    return res.json({ ok: true, created });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
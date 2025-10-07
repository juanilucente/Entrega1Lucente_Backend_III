const bcrypt = require('bcrypt');
const { Types } = require('mongoose');

const saltRounds = 10;

// simple random helper without external deps
function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min; }

function sample(arr){ return arr[randInt(0, arr.length-1)]; }

function generateNamePair(i){
  const firstNames = ['Juan','Ana','Luis','María','Carlos','Lucía','Pedro','Sofía','Diego','Valentina','Martin','Camila','Joaquín','Agustina'];
  const lastNames = ['González','Rodríguez','Pérez','Gómez','Fernández','López','Martínez','Sosa','Romero','Díaz'];
  const fn = sample(firstNames);
  const ln = sample(lastNames);
  return { firstName: `${fn}${i}`, lastName: `${ln}` };
}

async function generateUsers(count = 50){
  const users = [];
  for(let i=0;i<count;i++){
    const { firstName, lastName } = generateNamePair(i+1);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i+1}@example.com`;
    const password = await bcrypt.hash('coder123', saltRounds);
    const role = (Math.random() < 0.85) ? 'user' : 'admin'; // mostly users
    const user = {
      _id: Types.ObjectId(),
      firstName,
      lastName,
      email,
      password,
      role,
      pets: [],
      createdAt: new Date()
    };
    users.push(user);
  }
  return users;
}

function generatePets(count = 10){
  const pets = [];
  const petNames = ['Rocky','Luna','Max','Milo','Bella','Lola','Thor','Nala','Odin','Coco','Simba','Kiwi'];
  const species = ['dog','cat','bird','hamster','rabbit'];
  for(let i=0;i<count;i++){
    pets.push({
      _id: Types.ObjectId(),
      name: `${petNames[i % petNames.length]}${i+1}`,
      species: sample(species),
      age: randInt(1,12),
      createdAt: new Date()
    });
  }
  return pets;
}

module.exports = { generateUsers, generatePets };
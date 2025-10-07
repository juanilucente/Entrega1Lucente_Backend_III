const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async function(email, password, done) {
    try {
      const user = await UserRepository.findByEmail(email);
      if(!user) return done(null, false, { message: 'Incorrect email.' });
      const match = await bcrypt.compare(password, user.password);
      if(!match) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await UserRepository.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});
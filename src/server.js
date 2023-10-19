require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const express = require('express');
const app = express();
const routes = require('./routes');

const User = require('./models/User'); // Adjust the path if needed
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('MONGO_URI', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB', error);
  });

app.use(cors()); // You can tighten up the security later


passport.use(new LocalStrategy(
  { usernameField: 'email' }, // if you use email for login instead of 'username'
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY' // This should be in a secure environment variable in production
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
          return done(null, user);
      }
      return done(null, false);
  } catch (err) {
      return done(err, false);
  }
}));


app.use(passport.initialize());

routes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
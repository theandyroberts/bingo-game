const userRoutes = require('./userRoutes');
const bingoRoutes = require('./bingoRoutes');

app.get('/api/game-data', passport.authenticate('jwt', { session: false }), (req, res) => {
  // ... your route logic here
  module.exports = (app) => {
    app.use('/users', userRoutes);
    app.use('/bingo', bingoRoutes);
  };

});

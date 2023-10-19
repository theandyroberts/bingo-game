const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const User = require('../models/User'); // Adjust the path if needed

// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the user to the database
    const newUser = new User({ username, password: hashedPassword });
    newUser.save((err) => {
        if (err) return res.status(500).send("Error registering new user.");

        // Create a JWT token and send it to the user
        const payload = { id: newUser.id };
        const token = jwt.encode(payload, 'SECRET_KEY');
        res.json({ token });
    });
});

// Login an existing user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ error: "No user found." });
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    const payload = { id: user.id };
                    const token = jwt.encode(payload, 'YOUR_SECRET_KEY');
                    res.json({ token });
                } else {
                    res.status(401).send({ error: "Wrong password." });
                }
            });
        }
    });
});



module.exports = router;

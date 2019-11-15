const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Jokes = require('../jokes/jokes-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  Jokes.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json({ err: `An error occurred.` });
    });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;

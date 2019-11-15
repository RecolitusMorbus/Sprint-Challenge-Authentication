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
  let { username, password } = req.body;

  Jokes.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);

        Jokes.findById(user.id)
          .then(user => {
            res.status(200).json({ message: `${user.username} has logged in.` }, token);
          });
      } else {
        res.status(401).json({ message: `Invalid credentials.` });
      };
    })
    .catch(err => {
      res.status(500).json({ err: `An error occurred.` });
    });
});

function getJwtToken(username) {
  const payload = { username };
  const secret = process.env.JWT_SECRET || 'Secrets are secret.';
  const options = { expiresIn: '1d' };

  return jwt.sign(payload, secret, options);
};

module.exports = router;

const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const bcrypt = require("bcryptjs");

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Please include a username and password and try again."
    });
  }
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 10);
  newUser.password = hash;
  db("users")
    .insert(newUser)
    .then(response => {
      res
        .status(200)
        .json({ message: "New account created successfully.", response });
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error creating the new account",
        error
      });
    });
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

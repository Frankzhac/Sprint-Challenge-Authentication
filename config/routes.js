require("dotenv").config();
const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
// const { restrictedMiddleware } = require('../auth/restrictedMiddleware');
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");
const jwt = require("jsonwebtoken");

const tokenService = require('../auth/token-service.js');
const Users = require('../users/users-model.js');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate , getJokes);
};

// function generateToken(user) {
//   const payload = {
//     username: user.id,
//     name: user.username
//   };
//
//   const secret = process.env.JWT_SECRET;
//
//   const options = {
//     expiresIn: "1d"
//   };
//
//   return jwt.sign(payload, secret, options);
// }


function register(req, res) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: "Please include a username and password."
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
        .json({ message: "New account created successfully."});
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
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user);

        res.status(200).json({
        message: `Welcome ${user.username}!, have a token...`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
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

import express from 'express';
import faker from 'faker';

// middlewares
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

const JWT_SECRET = 'Gl0b4nt123$';
const HOST = 'localhost';
const PORT = 3001;

const DATABASE_USER = {
  username: 'globant',
  password: '123',
  organization: 'Globant',
  site: 'Lima',
  topic: 'JWT Talk',
  firstname: 'Juan',
  lastname: 'Vento'
};

const app = express();

// morgan is our request logger middleware
app.use(morgan('tiny'));

// enable CORS in our express server
app.use(cors());

// bodyParser parse incoming request´s body
app.use(bodyParser.json());

// expressJwt validate that the HTTP request has the JWT token
app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: [ '/login' ]}));

// unauthorized error handler function
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: err.message });
  }
});

app.post('/login', authenticate, function(req, res) {
  const { username, organization, site } = DATABASE_USER;

  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  // default algorithm (HMAC SHA256)
  // returns the JsonWebToken as string
  const token = jwt.sign({
    username,
    organization,
    site
  }, JWT_SECRET);

  res.status(200).send({
    token,
    user: DATABASE_USER
  });
});

app.get('/random-user', function(req, res) {
  const user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

function authenticate(req, res, next) {
  const { body } = req;
  if (!body.username || !body.password) {
    res.status(400).send({ message: 'credentials are required' });
  } else if (body.username !== DATABASE_USER.username ||
             body.password !== DATABASE_USER.password) {
    res.status(401).send({ message: 'wrong credentials' });
  } else {
    next();
  }
}

app.listen(PORT, HOST, function() {
  console.log(`Auth server listening on ${HOST}:${PORT}`);
});


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
  organization: 'globant',
  site: 'lima',
  topic: 'jwt talk'
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/random-user', function(req, res) {
  const user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

app.post('/login', authenticate, function(req, res) {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  // default algorithm (HMAC SHA256)
  const { username, organization, site } = DATABASE_USER;
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
  console.log(`listening on ${HOST}:${PORT}`);
});


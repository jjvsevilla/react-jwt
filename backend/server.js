import express from 'express';
import faker from 'faker';
import cors from 'cors';

const HOST = 'localhost';
const PORT = 3001;

const app = express();
app.use(cors());

app.get('/random-user', function(req, res) {
  const user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
});

app.listen(PORT, HOST, function() {
  console.log(`listening on ${HOST}:${PORT}`);
});


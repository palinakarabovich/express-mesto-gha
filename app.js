require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, routerUsers);
app.use('/cards', auth, routerCards);
app.patch('*', (req, res) => {
  res.status(404).send({ message: 'URL  не сущетсвует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

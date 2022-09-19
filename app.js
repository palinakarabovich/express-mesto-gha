const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');

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
app.all('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

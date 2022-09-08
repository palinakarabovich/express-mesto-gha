const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routers/users');
const routerCards = require('./routers/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631875c7ae6eb1cf7cdec697',
  };

  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'URL  не сущетсвует' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

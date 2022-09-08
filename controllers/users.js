const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users.map((user) => {
        const {
          name,
          about,
          avatar,
          _id,
        } = user;
        return {
          name,
          about,
          avatar,
          _id,
        };
      }));
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(400).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        const {
          name,
          about,
          avatar,
          _id,
        } = user;
        res.send({
          data: {
            name, about, avatar, _id,
          },
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Пользователь по указанному _id не найден' });
      }
      res.status(500).send({ message: `Произошла ошибка ${err.name}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      const {
        _id,
      } = user;
      res.send({
        data: {
          name, about, avatar, _id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  if (typeof name === 'undefined') {
    if (about.length > 31 || about.length <= 1) {
      res.status(400).send({ message: 'Введены некорректные данные' });
      return;
    }
  } else if (name.length > 31 || name.length <= 1) {
    res.status(400).send({ message: 'Введены некорректные данные' });
    return;
  }
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        const {
          avatar,
          _id,
        } = user;
        res.send({
          data: {
            name, about, avatar, _id,
          },
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        const {
          name,
          about,
          _id,
        } = user;
        res.send({
          data: {
            name, about, avatar, _id,
          },
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};

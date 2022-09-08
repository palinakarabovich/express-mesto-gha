const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards.map((card) => {
        const {
          likes,
          _id,
          name,
          link,
          owner,
          createdAt,
        } = card;
        return {
          likes, _id, name, link, owner, createdAt,
        };
      }));
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      const {
        likes,
        _id,
        createdAt,
      } = card;
      res.send({
        data: {
          likes, _id, name, link, owner, createdAt,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card === null) {
        res.status(400).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        const {
          likes,
          _id,
          name,
          link,
          owner,
          createdAt,
        } = card;
        res.send({
          data: {
            likes, _id, name, link, owner, createdAt,
          },
        });
      }
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}` }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        const {
          likes,
          _id,
          name,
          link,
          owner,
          createdAt,
        } = card;
        res.send({
          data: {
            likes, _id, name, link, owner, createdAt,
          },
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        const {
          likes,
          _id,
          name,
          link,
          owner,
          createdAt,
        } = card;
        res.send({
          data: {
            likes, _id, name, link, owner, createdAt,
          },
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для удаления лайка' });
      } else { res.status(500).send({ message: `Произошла ошибка ${err.name}` }); }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

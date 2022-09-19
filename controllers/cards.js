const Card = require('../models/card');
const NoRightsError = require('../errors/NoRightsError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при создании карточки'));
      } else next(err);
    });
};

const deleteCard = (req, res, next) => {
  const removeCard = () => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send(card))
      .catch(next);
  };

  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) next(new NotFoundError('Карточки не существует'));
      if (req.user._id === card.owner.toString()) {
        return removeCard();
      }
      return next(new NoRightsError('Нельзя удалить чужую карточку'));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return next(
          new NotFoundError('Запрашиваемая карточка для добавления лайка не найдена'),
        );
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card === null) {
        return next(
          new NotFoundError('Запрашиваемая карточка для удаления лайка не найдена'),
        );
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

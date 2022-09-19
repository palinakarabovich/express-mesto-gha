const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regEx = require('../constants/constants');

const {
  getAllUsers, getUser, updateProfile, updateAvatar, findCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', findCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
}), updateAvatar);

module.exports = router;

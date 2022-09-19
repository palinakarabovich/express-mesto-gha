const router = require('express').Router();

const {
  getAllUsers, getUser, updateProfile, updateAvatar, findCurrentUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', findCurrentUser);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

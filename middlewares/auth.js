const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const handleAuthError = (next) => {
  next(new AuthError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;
  return next();
};

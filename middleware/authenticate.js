const {User} = require('./../models/user');

const authenticate = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization;
    const token = authorization.split(' ')[1];
    const user =  User.findByToken(token);
    if (!user) {
      throw new Error('User not found');
    } else {
      req.token = token;
      next();
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized. ( No Token Provided )');
  }
};
module.exports = {authenticate};

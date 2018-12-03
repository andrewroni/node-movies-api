const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {ObjectID} = require('mongodb');
const {User} = require('../models/user');

exports.createUser = async (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;
  const user = await new User({
    name,
    email,
    password
  });
  if (!user) {
    res.status(400);
    throw new Error('err');
  }
  user.save((err, user) => {
    if (err) {
      res.status(400);
      return next(err);
    } else {
      res.json({
        message: 'User succesfuly created. Now you can login.'
      });
    }
  });
};

exports.authUser = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email
  });
  if (!user) {
    res.status(401);
    return next({
      message: `Email: ${email} was not found`
    });
  } else {
    bcrypt.compare(password, user.password, (err, response) => {
      if (response) {
        if (user.tokens) {
          user.tokens = [];
        }
        const access = 'auth';
        const token = jwt.sign({
          _id: user._id.toHexString(),
          access
        }, process.env.JWT_SECRET, {
          expiresIn: "1h"
        }).toString();
        user.tokens.push({
          access,
          token
        });
        user.save();
        res.json({
          token
        });
      } else {
        res.status(401);
        return next({
          message: 'Wrong password'
        });
      }
    });
  }
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({}, 'id name email');
  if (users.length === 0) {
    res.status(404);
    return next({
      message: 'No users was found'
    });
  } else {
    res.json(users);
  }
};

exports.getUser = async (req, res, next) => {
  const {id} = req.params;
  if (!ObjectID.isValid(id)) {
    res.status(400);
    return next({
      message: 'Id not valid'
    });
  }
  const user = await User.findById(id, 'id name email');
  if (!user) {
    res.status(404);
    return next({
      message: `User with id: ${id} was not found`
    });
  } else {
    res.json(user);
  }
};

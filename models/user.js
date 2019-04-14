const {Schema, model} = require('mongoose');
const validator       = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt             = require('jsonwebtoken');
const bcrypt          = require('bcryptjs');

// Объект user должен иметь:
// id
// name  - минимальная длина 5, максимальная 25 символов
// email - минимальная длина 8, максимальная 50 символов
// password

// ––––––––––––––––––––––––––––––––––––
// В качестве id, использовал ObjectId
// ––––––––––––––––––––––––––––––––––––

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: [5, 'At list 5 characters'],
    maxlength: [25, 'Not more than 25 characters']
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: [8,'At list 8 characters'],
    maxlength: [50, 'Not more than 50 characters'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: [true,'Password is required'],
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


// Actions with token

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
    throw new Error(e);
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET, {
      expiresIn: "12h"
    }).toString();
  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    });
  }
  next();
});

UserSchema.plugin(uniqueValidator);
const User = model('User', UserSchema);

module.exports = {User};

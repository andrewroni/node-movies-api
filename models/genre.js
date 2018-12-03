const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Объект genres должен иметь только id и name (название жанра)

// ––––––––––––––––––––––––––––––––––––
// В качестве id, использовал ObjectId
// ––––––––––––––––––––––––––––––––––––

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: [3,'At list 3 characters'],
    index: true
  }
});

GenreSchema.plugin(uniqueValidator);
const Genre = model('Genre', GenreSchema);

module.exports = {Genre};

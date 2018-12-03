const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Объект movies должен иметь:
//
// id
// name   от 1 до 5 символов
// year	   только 4 цифры
// price - только цифры, любое количество
// genre: id жанра
// image: постер фильма.  после загрузки оригинала, он должен быть обрезан до размера 100x200, с сохранением оригинала на сервере. Максимальный размер загружаемого изображения - 2mb

// ––––––––––––––––––––––––––––––––––––
// В качестве id, использовал ObjectId
// name : maxlength сделал 70, т.к. подовляющее большинство фильмов содержат в названии больше чем 5 символов
// ––––––––––––––––––––––––––––––––––––
const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 70
  },
  year: {
    type: Number,
    min: [1000, 'Must be at list 1000 year'],
    max: [9999, 'Must be less than 9999 year']
  },
  price: {
    type: Number
  },
  genre: {
    type: String
  },
  image: {
    type: Schema.Types.Mixed,
    required: true
  }
});

MovieSchema.plugin(uniqueValidator);
const Movie = model('Movie', MovieSchema);

module.exports = {Movie};

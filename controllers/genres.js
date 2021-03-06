const {ObjectID} = require('mongodb');
const {Genre}    = require('../models/genre');

exports.getGenres = async (req, res, next) => {
  const genres = await Genre.find();
  if (genres.length === 0) {
    res.status(404);
    return next({ message: 'No genres was found'});
  }
  res.json(genres);
};

exports.getGenre = async (req, res, next) => {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const genre = await Genre.findById(id);
  if (!genre) {
    res.status(404);
    return next({ message: `Genre with id: ${id} was not found`});
  }
  res.json(genre);
};

exports.createGenre = async (req, res, next) => {
  const { name } = req.body;
  const genre = new Genre({ name });
  if (!genre) {
    res.status(400);
    return next({ message: `Genre ${name} was not add` });
  } else {
    await genre.save((err, genre) => {
      if (err) {
        res.status(400);
        return next(err);
      } else {
        res.json({ message: `Genre ${name} was successfully add`, genre });
      }
    });
  }
};

exports.removeGenre = async (req, res, next) => {
  const { id } = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) {
    res.status(404);
    return next({ message: `Genre with id: ${id} was not found`});
  }
  res.json({ message: `Genre with id: ${id} was successfully deleted` });
};

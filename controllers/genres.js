const {ObjectID}       = require('mongodb');
const {Genre}          = require('../models/genre');

exports.getGenres = async (req, res, next) => {
  const genres = await Genre.find({}, 'id name');
  if (genres.length === 0) {
    res.status(404);
    return next({ message: 'No genres was found'});
  } else {
    res.json(genres);
  }
};

exports.getGenre = async (req, res, next) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const genre = await Genre.findById(id, 'id name');
  if (!genre) {
    res.status(404);
    return next({ message: `Genre with id: ${id} was not found`});
  } else {
    res.json(genre);
  }
};

exports.createGenre = async (req, res, next) => {
  const {name} = req.body;
  const genre = await new Genre({ name });
  if (!genre) {
    res.status(400);
    return next({ message: `Genre ${name} was not add` });
  } else {
    genre.save((err, genre) => {
      if (err) {
        res.status(400);
        return next(err);
      } else {
        res.json({ message: `Genre ${name} was succesfuly add`, genre });
      }
    });
  }
};

exports.removeGenre = async (req, res, next) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const genre = await Genre.findByIdAndDelete(id);
  if (!genre) {
    res.status(404);
    return next({ message: `Genre with id: ${id} was not found`});
  } else {
    res.json({ message: `Genre with id: ${id} was succesfuly deleted` });
  }
};

const imgConfig = require('../config/multer.json');

const sharp  = require('sharp');
const fs     = require('fs');

const {Genre}               = require('../models/genre');
const {Movie}               = require('../models/movie');
const {ObjectID}            = require('mongodb');
const {idToGenreConverter}  = require('../helpers/helpers');

exports.getMovies = async (req, res, next) => {
  //@todo: there should be pagination
  const movies = await Movie.find({}, 'id name year price genre image');
  if (movies.length === 0) {
    res.status(404);
    return next({ message: 'No movies was found'});
  } else {
    const genres = await Genre.find({}, 'id name');
    idToGenreConverter(movies, genres);
    res.json(movies);
  }
};

exports.getMovie = async (req, res, next) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const movie = await Movie.findById(id, 'id name year price genre image');
  if (!movie) {
    res.status(404);
    return next({
      message: `Movie with id: ${id} was not found`
    });
  } else {
    const genres = await Genre.find({}, 'id name');
    idToGenreConverter([movie], genres);
    res.json(movie);
  }
};

exports.createMovie = async (req, res, next) => {
  if (!req.file) {
    return next({ message: 'Image is required'});
  }
  const {name, year, price, genre} = req.body;
  const result = await Genre.findOne({name: genre});
  if (!result) {
    //@todo You can create new genre here, or send an error that provided genre does not exist, and you have to create it fisrt(for example..) etc.
    return next({ message: `Provided genre, \'${genre}\', does not exist. Please, create it first`});
  } else {
    sharp(req.file.path)
    .resize(imgConfig.imageWidth, imgConfig.imageHeight, { fit: 'inside' })
    .toFile('public/img/thumb/' + 'thumb-' + req.file.filename, function (err, info) {
      if (err) {
        req.status(400);
        return next(err);
      }
    });
    const movie = await new Movie({ name, year, price, genre: result._id , image: { original: req.file.path, thumb: 'public/img/thumb/thumb-' + req.file.filename}});
    if (!movie) {
      res.status(400);
      return next({ message: `Movie: ${name} was not add` });
    } else {
      movie.save((err, movie) => {
        if (err) {
          res.status(400);
          return next(err);
        } else {
          res.json({ message: `Movie: ${name} was successfully add`, movie });
        }
      });
    }
  }
};

exports.removeMovie = async (req, res, next) => {
  const {id} = req.params;
  if(!ObjectID.isValid(id)) {
    res.status(400);
    return next({ message: 'Id not valid'});
  }
  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    res.status(404);
    return next({ message: `Movie with id: ${id} was not found`});
  } else {
    fs.exists(movie.image.original, function(originalExists) {
      if(originalExists) {
        fs.unlink(movie.image.original, () => {});
        fs.exists(movie.image.thumb, function(thumbExists) {
          if(thumbExists) {
            fs.unlink(movie.image.thumb, () => {});
          } else {
            console.log(`File ${movie.image.thumb} was not found`);
          }
        });
      } else {
        console.log(`File ${movie.image.original} was not found`);
      }
    });
    res.json({ message: `Movie with id: ${id} was successfully deleted` });
  }
};

const idToGenreConverter = (movies, genres) => {
  for (movie of movies) {
    const result = genres.filter((e) => e._id == movie.genre);
    if (result.length > 0) {
      movie.genre = result[0];
    } else {
      //@Todo Handle this case somehow : create new genre, or assign 'unknown genre' to movie.genre
      console.log(`Worning, genre with id ${movie.genre} does not exist`);
    }
  }
};

module.exports = {idToGenreConverter};

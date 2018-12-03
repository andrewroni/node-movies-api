const router = require('express').Router();

const genreController = require('../controllers/genres');

// endpoint /genres :
// GET /genres (вывод всего списка жанров)
// GET /genres/:id - вывод жанра по id
// POST /genres - добавление нового жанра
// DELETE /genres/:id - удаление жанра по id

router.get('/', genreController.getGenres);
router.get('/:id', genreController.getGenre);
router.post('/', genreController.createGenre);
router.delete('/:id', genreController.removeGenre);

module.exports = router;

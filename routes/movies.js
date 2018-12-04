const router = require('express').Router();

const {authenticate}  = require('../middleware/authenticate');
const {upload}  = require('../middleware/multer');
const movieController = require('../controllers/movies');

// endpoint /movies :
// GET /movies (вывод всего списка фильмов)
// GET /movies/:id - вывод фильма по id
// POST - добавление нового фильма
// DELETE /movies/:id - удаление фильма по id, тоже нужно быть авторизованным

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovie);
router.post('/', upload, movieController.createMovie);
router.delete('/:id', authenticate, movieController.removeMovie);

module.exports = router;

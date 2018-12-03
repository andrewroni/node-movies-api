const router = require('express').Router();

const {authenticate} = require('../middleware/authenticate');
const userController = require('../controllers/users');

// endpoint /users:
// POST /users - возможность регистрации пользователя (пароль хешировать с помощью bcrypt)
// POST /users/auth - авторизация пользователя, по мейлу и паролю, в ответ мы должны получить JWT - токен.
// GET /users/ - вывести всех пользователей(скрывая поле password), только для пользователя, предоставившего валидный JWT token
// GET /users/:id - только с авторизацией аналогичной выше, вывести одного пользователя по id, скрывая поле password

router.post('/', userController.createUser);
router.post('/auth', userController.authUser);
router.get('/', authenticate, userController.getUsers);
router.get('/:id', authenticate, userController.getUser);

module.exports = router;

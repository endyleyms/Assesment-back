const { Router } = require('express');

const { handlerAllUsers, handlerGetUser, handlerCreateUser } = require('./user.controller');

const router = Router();

router.get('/', handlerAllUsers);
router.get('/:id', handlerGetUser);
router.post('/', handlerCreateUser);

module.exports = router;
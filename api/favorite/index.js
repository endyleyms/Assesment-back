const { Router } = require('express');
const { isAuthenticated} = require('../auth/auth.service');
const {
    handlerAllFavs,
    handlerOneFav,
    handlerCreateFav,
    handlerUpdateFav,
    handlerDeleteFav,
} = require('./favorite.controller');

const router = Router();

router.get('/', isAuthenticated(), handlerAllFavs);
router.get('/:id', isAuthenticated(), handlerOneFav);
router.post('/',  isAuthenticated(), handlerCreateFav);
router.patch('/:id', isAuthenticated(), handlerUpdateFav);
router.delete('/:id', isAuthenticated(),  handlerDeleteFav);

module.exports = router;
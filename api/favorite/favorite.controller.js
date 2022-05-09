const {
    getAllFavs, getOneFav, createFav, updatedFav, deleteFav,
  } = require('./favorite.service');
  
  async function handlerAllFavs(req, res) {
    try {
      const favs = await getAllFavs(req.user);
      res.status(200).json(favs);
    } catch (error) {
      res.status(401).json({message:'Isnt Authenticated'})
    }
    
  }
  
  async function handlerOneFav(req, res) {
    const { id } = req.params;
    const fav = await getOneFav(id);
  
    if (!fav) {
      res.status(404).json({ message: `fav not found with id: ${id}` });
    } else {
      res.json(fav);
    }
  }
  
  async function handlerCreateFav(req, res) {
    const newFav = { ...req.body, userId: req.user._id};
    const fav = newFav && await createFav(newFav);
    if (!fav.title) {
      res.status(404).json({ message: 'fav not create' });
    } else {
      res.json(fav);
    }
  }
  
  async function handlerUpdateFav(req, res) {
    const { id } = req.params;
    const { body } = req;
    const fav = await updatedFav(id, body);
    if (!fav) {
      res.status(404).json({ message: 'the fav doesnt exist' });
    } else {
      res.json(fav);
    }
  }
  
  async function handlerDeleteFav(req, res) {
    const { id } = req.params;
    await deleteFav(id);
    res.status(204).send({});
  }
  
  module.exports = {
    handlerAllFavs,
    handlerOneFav,
    handlerCreateFav,
    handlerUpdateFav,
    handlerDeleteFav,
  };
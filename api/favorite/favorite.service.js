const { ObjectId } = require('mongoose').Types;
const favoriteModel = require('./favorite.model');

async function getAllFavs(user) {
  const favs = await favoriteModel.find({ userId: new ObjectId(user._id)});
  return (favs);
}

async function getOneFav(_id) {
  const fav = await favoriteModel.findById({userId: {_id}});
  return (fav);
}

async function createFav(fav) {
  const newFav = await favoriteModel.create(fav);
  return (newFav);
}

async function updatedFav(id, fav) {
  const FavUpdated = await favoriteModel.findByIdAndUpdate(id, fav);
  return (FavUpdated);
}

async function deleteFav(id) {
  const favDeleted = await favoriteModel.findByIdAndDelete(id);
  return (favDeleted);
}

module.exports = {
    getAllFavs, getOneFav, createFav, updatedFav, deleteFav
};

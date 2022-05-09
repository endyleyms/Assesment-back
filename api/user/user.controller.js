const crypto = require('crypto');
const { geUser, getAllUsers, createUser } = require('./user.service');

async function handlerAllUsers(request, response){
 try {
  const users = await getAllUsers();
  response.status(200).json(users)
 } catch (error) {
   response.status(400).json({message:'cant get all users'})
 }
}

async function handlerGetUser(request, response) {
  const { id } = request.params;
  try {
    const user = await geUser(id);
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: 'error, user doesnt exist' });
  }
}


async function handlerCreateUser(request, response) {
    const newUser = request.body;
    try {
      const hash = crypto.createHash('sha256')
      .update(newUser.email)
      .digest('hex');
      newUser.passwordResetToken = hash;
      newUser.passwordResetExpires = Date.now() + 3600000 * 24;
      const user = newUser && await createUser(newUser);
      response.status(201).json(user);
    } catch (error) {
      response.status(404).json({ message: JSON.stringify(error) });
    }
}

module.exports = { handlerAllUsers, handlerGetUser, handlerCreateUser};
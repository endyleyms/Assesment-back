const { getUserByEmail } = require('../user/user.service');
const { signToken } = require('./auth.service');

async function handlerLogin(request, response) {
  const { email, password } = request.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return response.status(401).json({ error: { message: 'El Usuario no existe' } });
    }
    const isMatch = await user.comparePassword(password);
    console.log("here")
    if (!isMatch) {
      return response.status(401).json({ error: { message: 'Email o contraseña invalido' } });
    }
    const token = signToken(user.profile);
    console.log('token', token);
    return response.status(200).json({ token });
  } catch (error) {
    return response.status(400).json({ error: { message: 'No se genera el token' }  });
    }
}


module.exports = { handlerLogin };
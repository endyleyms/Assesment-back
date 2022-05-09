const fav = require('./api/favorite');
const authLocal = require('./api/auth');
const user = require('./api/user');

function routes(app){
    app.use('/api/favs', fav);
    app.use('/api/users', user);
    app.use('/auth/local', authLocal);
}
module.exports = routes;
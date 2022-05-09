const UserModel = require('./user.model');

async function getAllUsers(){
    const users = await UserModel.find();
    return (users);
}

async function geUser (id){
    const user = await UserModel.findById(id);
    return (user);
}


async function createUser(user) {
    const newUser = await UserModel.create(user);
    return newUser;
}
async function getUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
}

module.exports = {
    geUser,
    getAllUsers,
    createUser,
    getUserByEmail
};
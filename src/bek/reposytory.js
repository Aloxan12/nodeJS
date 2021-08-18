const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String
  });

 const User = mongoose.model('MyUser', userSchema);

const getUsers = () => {
    return User.find();
}

const deleteUser = (id) => {
    return User.deleteOne({_id: id})
}

const addUsers = async(name) => {
    const user = new User({name})
    return user.save()
}

exports.getUsers = getUsers;
exports.addUsers = addUsers;
exports.deleteUser = deleteUser;
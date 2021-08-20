const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String
  });

 const User = mongoose.model('MyUser', userSchema);

const getUsers = (search) => {
    if(!search){
    return User.find();
}else{
    return User.find({name: new RegExp(search)});
}}

const getUser = (id) => {
    return User.find({_id: id});
}

const deleteUser = (id) => {
    return User.deleteOne({_id: id})
}
const updateUser = (id, name) => {
    return User.update({_id: id}, {name: name})
}

const addUsers = async(name) => {
    const user = new User({name})
    return user.save()
}

exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.getUser = getUser;
exports.addUsers = addUsers;
exports.deleteUser = deleteUser;
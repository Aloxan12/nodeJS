const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    role: {type: String, ref: 'Role'},
    avatar: {type: String, allowNull: true},
    status: {type: String, allowNull: true, required: false},
}, {collection : 'users' })

export const UserModel =  model('User', UserSchema)
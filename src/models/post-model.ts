import { UserModel } from "./user-model"

const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    postText: {type: String, required: true},
    author: {type: UserModel, ref: 'User', required: true},
    publicDate: {type: Date, required: true},
}, {collection : 'posts' })

export const PostModel =  model('Post', PostSchema)
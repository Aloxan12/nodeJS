import mongoose from "mongoose"
import {UserModel} from "./user-model"

const {Schema, model} = require('mongoose')

const ChatSchema = new Schema({
    postText: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    publicDate: {type: Date, required: true},
    likes: {type: [String], ref: 'User', required: true},
}, {collection: 'posts'})

export const ChatModel = model('Chat', ChatSchema)
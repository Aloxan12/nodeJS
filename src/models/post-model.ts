import {Schema, model} from "mongoose"

const PostSchema = new Schema({
    postText: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    publicDate: {type: Date, required: true},
    likes: {type: [String], ref: 'User', required: true},
}, {collection: 'posts'})

export const PostModel = model('Post', PostSchema)
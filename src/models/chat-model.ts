const {Schema, model} = require('mongoose')

const ChatSchema = new Schema({
    users: {type: [Schema.Types.ObjectId], ref: 'User', required: true},
    dateLastMessage: {type: String},
}, {collection: 'chats'})

export const ChatModel = model('Chat', ChatSchema)
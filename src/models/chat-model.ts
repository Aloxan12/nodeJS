const {Schema, model} = require('mongoose')

const ChatSchema = new Schema({
    users: {type: [Schema.Types.ObjectId], ref: 'User', required: true},
    // messages: {type: [String], ref: 'Message', required: true},
}, {collection: 'chats'})

export const ChatModel = model('Chat', ChatSchema)
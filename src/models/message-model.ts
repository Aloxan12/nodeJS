const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
    text: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    publicDate: {type: Date, required: true},
    chatId: {type: Schema.Types.ObjectId, ref: 'Chat'},
}, {collection: 'messages'})

export const MessageModel = model('Message', MessageSchema)
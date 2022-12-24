const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
}, {collection : 'tokens' })

export const tokenModel = model('Token', TokenSchema)
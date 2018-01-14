const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    u_no: { type: Number },
    sender: { type: String },
    recepient: { type: String },
    command: { type: String },
    type: { type: String, default: 'text' },
    data: { type: String },
    date: {
        type: Object
    },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date },
    del: { 
        type: Boolean, 
        default: false 
    }
})

MessageSchema.plugin(autoIncrement.plugin, { 
    model: 'MessageModel',
    field: 'no',
    startAt: 0,
    incrementBy: 1
})

module.exports = mongoose.model('message1', MessageSchema)
const crypto = require('crypto')

const Schema = {}

Schema.createSchema = function (mongoose) {

    const MessageSchema = mongoose.Schema({
        sender: { type: String, index: 'hashed' },
        recepient: { type: String, index: 'hashed' },
        command: { type: String, index: 'hashed', default: 'chat' },
        type: { type: String, index: 'hashed', default: 'text' },
        data: { type: String, required: true },
        roomname: { type: String, index: 'hashed', default: '' }
    })

    /**
     * recepient ALL
     * 
     * sender: ??
     * recepient: ALL
     * command: chat
     * type: text
     * data: 메시지
     * roomname: 영향없음
     * 
     */
    // 

    MessageSchema.statics.findByRoomName = function (roomname, callback) {
        return this.findOne({ roomname }, callback)
    }

    MessageSchema.statics.findByRecepient = function (recepient) {
        return this.find({ recepient })
    }

    // MessageSchema.statics.findAll = function (callback) {
    //     return this.find({}, callback)
    // }



    return MessageSchema

}


module.exports = Schema
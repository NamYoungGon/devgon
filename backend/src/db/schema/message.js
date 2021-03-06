const crypto = require('crypto')

const Schema = {}

Schema.createSchema = function (mongoose, autoIncrement) {

    const MessageSchema = mongoose.Schema({
        u_no: { type: Number, index: 'hashed' },
        sender: { type: String, index: 'hashed' },
        recepient: { type: String, index: 'hashed' },
        command: { type: String, index: 'hashed', default: 'chat' },
        type: { type: String, index: 'hashed', default: 'text' },
        data: { type: String, required: true },
        date: { type: Object, default: {} }
    })

    MessageSchema.plugin(autoIncrement.plugin, { 
        model: 'MessageModel',
        field: 'no',
        startAt: 0,
        incrementBy: 1
    })

    /**
     * recepient ALL
     * 
     * sender: ??
     * recepient: ALL
     * command: chat
     * type: text
     * data: 메시지
     * date: 시간
     * readInfo: 읽었는지 여부
     * 
     * ---------------------------
     * 
     * recepient 
     * 
     * sender: ??
     * recepient: 방이름
     * command: roomchat
     * type: text
     * data: 메시지
     * 
     */
    // 

    MessageSchema.statics.findByRoomId = function (roomid, callback) {
        return this.findOne({ roomid }, callback)
    }

    MessageSchema.statics.findByRecepient = function (recepient) {
        return this.find({ recepient })
    }



    return MessageSchema

}


module.exports = Schema
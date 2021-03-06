const { getResJSON } = require('./../lib/common')

const save = async (req, callback) => {
    const database = global.database

    let error = false
    let message = ''
    let data = null

    try {
        const messageModel = new database.MessageModel(req)
        const results = await messageModel.save()
        
        if (results) {
            message = '메시지 저장을 성공하였습니다.'
            data = req
        } else {
            error = true
            message = '메시지 저장을 실패하였습니다.'
        }
    } catch (err) {
        error = true
        message = 'message save 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

const getMessagesByRecepient = async (req, callback) => {
    const database = global.database
    
    let error = false
    let message = ''
    let data = null

    try {
        const results = await database.MessageModel.findByRecepient(req)
        
        if (results) {
            data = { messages: [] }

            Array.from(results).forEach(aMessage => {
                data.messages.push(aMessage)
            })
        } else {
            message = '조회된 메시지가 없습니다.'
        }

    } catch (err) {
        error = true
        message = 'getMessagesByRecepient 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

module.exports = {
    save,
    getMessagesByRecepient
}
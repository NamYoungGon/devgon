const { getResJSON } = require('./../../lib/common')

const getMessagesByRecepient = async (recepient, callback) => {
    const database = global.database
    
    let error = false
    let message = ''
    let data = null

    try {
        const results = await database.MessageModel.findByRecepient(recepient)
        
        if (results) {
            data = { messages: [] }

            results.forEach(aMessage => {
                data.messages[aMessage.no] = aMessage
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
    getMessagesByRecepient
}
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
    } catch (err) {console.log(err)
        error = true
        message = 'message save 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

module.exports = {
    save
}
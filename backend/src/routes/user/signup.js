const { getResJSON } = require('./../../lib/common')

const signup = async (db, email, password, name, callback) => {
    let error = false
    let message = ''
    let data = null

    const getRandomNumber = () => {
        return parseInt(Math.random() * 1000000, 10)
    }

    try {
        const user = new db.UserModel({ email, password, name })
        const results = await user.save()
        
        if (results) {
            message = '사용자 추가를 성공하였습니다.'
            data = {
                email,
                name
            }
        } else {
            message = '사용자 추가를 실패하였습니다.'
        }
    } catch (err) {
        error = true
        message = err.message
    }

    callback(getResJSON(error, message, data))
}

module.exports = signup
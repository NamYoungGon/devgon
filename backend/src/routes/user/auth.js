const { getResJSON } = require('./../../lib/common')

const auth = async (db, email, password, callback) => {
    let error = false
    let message = ''
    let data = null

    try {
        const results = await db.UserModel.findByEmail(email)

        if (results) {
            const user = new db.UserModel({ email })
            const authenticated = user.authenticate(password, results.salt, results.hashed_password)

            if (authenticated) {
                message = '사용자 인증을 성공하였습니다.'
                data = {
                    email,
                    name: results.name
                }
            } else {
                message = '패스워드가 일치하지 않습니다.'
            }
        } else {
            message = '일치하는 이메일의 사용자가 없습니다.'
        }
    } catch (err) {
        error = true
        message = 'auth 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

module.exports = auth
const { getResJSON } = require('./../../lib/common')

const signin = async (db, email, password, callback) => {
    let error = false
    let message = ''
    let data = null

    try {
        const results = await db.UserModel.findByEmail(email)

        if (results) {
            let authenticated = false

            if (password === results.hashed_password) {
                authenticated = true
            } else {
                const user = new db.UserModel({ email })
                authenticated = user.authenticate(password, results.salt, results.hashed_password)
            }

            if (authenticated) {
                message = '사용자 인증을 성공하였습니다.'
                data = {
                    email,
                    hashed_password: results.hashed_password,
                    name: results.name,
                }
            } else {
                message = '패스워드가 일치하지 않습니다.'
            }
        } else {
            message = '일치하는 이메일의 사용자가 없습니다.'
        }
    } catch (err) {
        error = true
        message = 'signin 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

module.exports = signin
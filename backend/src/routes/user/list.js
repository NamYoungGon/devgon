const { getResJSON } = require('./../../lib/common')

const list = async (database, callback) => {
    let error = false
    let message = ''
    let data = null

    try {
        const results = await database.UserModel.findAll()

        if (results) {
            data = { users: [] }

            Array.from(results).forEach(user => {
                const { email, name } = user

                data.users.push({
                    email,
                    name
                })
            })
        } else {
            message = '조회된 사용자가 없습니다.'
        }

    } catch (err) {
        error = true
        message = 'list 함수 에러 발생'
    }

    callback(getResJSON(error, message, data))
}

module.exports = list
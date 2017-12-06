const { getResJSON } = require('./../../lib/common')

const signout = async (callback) => {
    let error = false
    let message = ''
    let data = null

    message = '로그아웃을 하였습니다.'

    callback(getResJSON(error, message, data))
}

module.exports = signout
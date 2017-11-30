const { auth, create, list } = require('./user')

const routePathStr = '/api/user/'

const u_login = (req, res) => {
    const database = req.app.get('database')

    const { email, password } = req.body

    if (database) {
        auth(database, email, password, resJSON => {
            res.json(resJSON)
        })
    } else {
        res.json({
            data: false,
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
}

const u_add = (req, res) => {
    const database = req.app.get('database')

    const { email, password, name } = req.body

    if (database) {
        create(database, email, password, name, resJSON => {
            res.json(resJSON)
        })
    } else {
        res.json({
            data: false,
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
}

const u_list = (req, res) => {
    const database = req.app.get('database')

    if (database) {
        list(database, resJSON => {
            res.json(resJSON)
        })
    } else {
        res.json({
            data: false,
            message: '데이터베이스 연결이 되어있지 않습니다.',
            error: true
        })
    }
}

module.exports = {
    u_login,
    u_add,
    u_list
}
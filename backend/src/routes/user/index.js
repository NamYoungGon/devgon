const { signin, signup, signout, list } = require('./user')

const routePathStr = '/api/user/'

const u_login = (req, res) => {
    const database = req.app.get('database')

    let { email, password } = req.body

    if (database) {
        if (email === undefined && password === undefined) {
            if (req.cookies.devgon) {
                const userObj = JSON.parse(req.cookies.devgon)
                email = userObj.email
                password = userObj.password
            }
        }

        signin(database, email, password, resJSON => {
            if (!resJSON.error && resJSON.data) {
                const userStr = JSON.stringify({ email, password })
                res.cookie('devgon', userStr)
            }

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

const u_logout = (req, res) => {
    res.clearCookie("devgon");
    signout(resJSON => {
        res.json(resJSON);
    })
}

const u_register = (req, res) => {
    const database = req.app.get('database')

    const { email, password, name } = req.body

    if (database) {
        signup(database, email, password, name, resJSON => {
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
    u_register,
    u_list,
    u_logout
}
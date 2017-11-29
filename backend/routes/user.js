const login = (req, res) => {
    console.log('/process/login 라우팅 함수 호출')

    const database = req.app.get('database')

    const paramEmail = req.body.email || req.query.email
    const paramPassword = req.body.password || req.query.password
    console.log(`요청 파라미터 : ${paramEmail}, ${paramPassword}`)


    if (database) {
        auth(database, paramEmail, paramPassword, (err, docs) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (docs) {
                console.dir(docs)

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 로그인 성공</h1> 
                    <p>사용자 : ${docs.name}</p>
                    <br/>
                    <a href='/login.html'>다시 로그인 하기</a>
                `)
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>사용자 데이터 조회 안됨</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('데이터베이스 연결 안됨')
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

const addUser = (req, res) => {
    console.log('/process/adduser 라우팅 함수 호출됨')

    const database = req.app.get('database')

    const paramEmail = req.body.email || req.query.email
    const paramPassword = req.body.password || req.query.password
    const paramName = req.body.name || req.query.name

    console.log(`요청 파라미터 : ${paramEmail} ${paramPassword} ${paramName} `)

    if (database) {
        add(database, paramEmail, paramPassword, paramName, (err, result) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (result) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`
                    <h1>사용자 추가 성공</h1> 
                    <p>사용자 : ${paramName}</p>
                `)
                res.end()
            } else {
                console.log('사용자 추가 안됨')
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>사용자 추가 안됨</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('에러 발생')

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

const listUser = (req, res) => {
    console.log('/process/listuser 라우팅 호출')

    const database = req.app.get('database')

    if (database) {
        database.UserModel.findAll((err, results) => {
            if (err) {
                console.log('에러 발생')

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>에러 발생</h1> `)
                res.end()
                return false
            } else if (results) {
                console.dir(results)

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })

                let listStr = ''
                let curEmail
                let curName
                for (var i = 0; i < results.length; i++) {
                    curEmail = results[i]._doc.email
                    curName = results[i]._doc.name
                    listStr += `<li>#${i} -> ${curEmail},  ${curName}</li>`
                }
                res.write(`
                    <h3>사용자 리스트</h3>
                    <div><ul>
                    ${listStr}
                    </ul></div>
                `)
                
                res.end()
            } else {
                console.log('조회된 사용자 없음')
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
                res.write(`<h1>조회된 사용자 없음</h1> `)
                res.end()
                return false
            }
        })
    } else {
        console.log('데이터베이스 연결 안됨')

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8;' })
        res.write(`<h1>데이터베이스 연결 안됨</h1> `)
        res.end()
    }
}

const auth = (db, email, password, callback) => {
    console.log(`authUser 호출됨 : ${email}, ${password}`)

    db.UserModel.findByEmail(email, (err, results) => {

        if (err) {
            callback(err, null)
            return false
        }

        console.log(`아이디 ${email}로 검색`)
        
        if (results) {
            const user = new db.UserModel({ email })
            console.dir(user)
            const authenticated = user.authenticate(password, results.salt, results.hashed_password)

            if (authenticated) {
                console.log('패스워드 일치')
                callback(null, results)
            } else {
                console.log('패스워드 일치하지 않음')
                callback(null, null)
            }
        } else {
            console.log('일치하는 아이디 사용자 없음')
        }
    })
}

const add = async (db, email, password, name, callback) => {
    console.log(`addUser 호출됨 : ${email}, ${password}, ${name}`)

    const user = new db.UserModel({ email, password, name })

    try {
        const results = await user.save()
        
        if (results) {
            console.log('사용자 데이터 추가함')
            callback(null, user)
        } else {
            console.log('???')
        }
    } catch (err) {
        callback(err, null)
    }
}

module.exports = {
    login,
    addUser,
    listUser
}
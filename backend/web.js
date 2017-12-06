const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const passport = require('passport')

const config = require('./src/config/config')
const database = require('./src/db/loader')
const route = require('./src/routes/loader')
const socket = require('./src/socket/loader')

const app = express()
app.set('port', process.env.PORT || config.port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressSession({
	secret: 'asdfsafadfs',
	resave: true,
	saveUninitialized: true
}));

//===== Passport 사용 설정 =====//
// Passport의 세션을 사용할 때는 그 전에 Express의 세션을 사용하는 코드가 있어야 함
app.use(passport.initialize());
app.use(passport.session());

// 패스포트 설정
const configPassport = require('./src/config/passport');
configPassport(app, passport);

// 패스포트 라우팅 설정
// var userPassport = require('./src/routes/user_passport');
// userPassport(router, passport);

route.init(app, express.Router())

const server = app.listen(app.get('port'), () => {
    console.log('Run server')

    database.init(app, config)
    global.database = database
    socket.init(app, server)
})


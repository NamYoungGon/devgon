const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')

const config = require('./src/config/config')
const database = require('./src/db/loader')
const route = require('./src/routes/loader')
const socket = require('./src/socket/loader')

const app = express()
const server = require('http').createServer(app)

app.set('port', process.env.PORT || config.port)

app.get('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(expressSession({
	secret: 'asdfsafadfs',
	resave: true,
	saveUninitialized: true
}))
app.use(cookieParser())

route.init(app, express.Router())

server.listen(app.get('port'), () => {
    console.log('Run WebServer')
    
    database.init(app, config)
    global.database = database
})

socket.init(app, server)


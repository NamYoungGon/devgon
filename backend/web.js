const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const config = require('./src/config')
const database_loader = require('./src/db/loader')
const route_loader = require('./src/routes/loader')

const app = express()
app.set('port', process.env.PORT || config.port)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

route_loader.init(app, express.Router())

const server = app.listen(app.get('port'), () => {
    console.log('Run server')

    database_loader.init(app, config)
})



const socketio = require('socket.io')
const io = socketio.listen(server)

io.sockets.on('connection', (socket) => {
    socket.on('message', message => {
        const { command,  }
        // command -> 
    })
})
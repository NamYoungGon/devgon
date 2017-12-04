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

const login_ids = {}
io.sockets.on('connection', (socket) => {
    socket.on('login', (login) => {
        if (login_ids[login.id]) return false
        
        console.log(`접속한 소켓 ID : ${socket.id}`)

        // Map 에 클라이언트 ID 저장
        login_ids[login.id] = socket.id

        // 소켓에 로그인 ID 저장
        socket.login_id = login.id

        console.log(`접속한 클라이언트 : ${Object.keys(login_ids).length}명`)
    })

    socket.on('message', res => {
        /**
         * res
         * -> sender
         * -> recepient
         * -> command
         * -> type
         * -> data
         */

        const { recepient, command } = res
        /**
         * recepient
         * -> ALL (나를 포함한 모든 클라이언트)
         * ->  (특정 대상 클라이언트)
         * 
         * command
         * -> roomchat (룸 채팅)
         * -> chat (1:1 채팅)
         */

         if (recepient === 'ALL') {
             io.sockets.emit('message', res)
         }

    })
})
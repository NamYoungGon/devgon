const socketio = require('socket.io')
const message = require('./../db/message')

const loader = {}
const login_ids = {}

loader.init = (app, server) => {
    connect(app, server)
}

function connect(app, server) {
    const io = socketio.listen(server)

    bind(io)
}

function bind(io) {
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
             * -> roomname
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
                const result = message.save(res, resJSON => {
                    console.log(resJSON)
                    const { error } = resJSON
                    if (!error)
                        io.sockets.emit('message', res)
                })
            }
        })
    })
}

module.exports = loader
const socketio = require('socket.io')
const message = require('./../db/message')

const loader = {}
const login_emails = {}

const usersInRoom = {

}

loader.init = (app, server) => {
    connect(app, server)
}

function connect(app, server) {
    const io = socketio.listen(server)

    bind(io)
}

function getDateObj() {
    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()

    return {
        year,
        month,
        day,
        hour,
        minute
    }
}

function bind(io) {
    io.sockets.on('connection', (socket) => {
        socket.on('login', (login) => {
            const { email, name } = login
            if (login_emails[email]) return false

            console.log(`접속한 소켓 ID : ${socket.id}`)
    
            // Map 에 클라이언트 ID 저장
            login_emails[email] = socket.id
    
            // 소켓에 유저 정보 저장
            socket.user = {
                email,
                name
            }

            socket.room = null

            console.log(`접속한 클라이언트 : ${Object.keys(login_emails).length}명`)
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
            res.date = getDateObj()
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
                    const { error } = resJSON
                    if (!error) {
                        io.sockets.emit('message', res)
                    }
                })
            } else {
                if (command === 'roomchat') {
                    const result = message.save(res, resJSON => {
                        const { error } = resJSON
                        if (!error) {
                            io.sockets.in(recepient).emit('message', res)
                        }
                    })
                }
            }
        })

        socket.on('room', res => {
            /**
             * res
             * -> command
             * -> roomId
             * -> roomName
             * -> roomOwner
             * 
             * command
             * -> create
             * -> update
             * -> delete
             * -> join
             * -> leave
             */
            const { command, roomId, roomName, roomOwer } = res

            if (command === 'create') {

                // 해당 아이디의 방이 존재하지 않을 경우
                if (io.sockets.adapter.rooms[roomId]) {
                    console.log('존재하는 방입니다.')
                } else {
                    socket.emit('room', res)
                }

            } else if (command === 'update') {
                
            } else if (command === 'delete') {

            } else if (command === 'join') {

                joinRoom(socket, res)

                io.sockets.in(roomId).emit('join', {
                    users: usersInRoom[roomId]
                })

            } else if (command === 'leave') {

                socket.leave(roomId)

            }
        })

        socket.on('disconnect', () => {
            disconnect(socket)
        })
    })
}

function joinRoom(socket, res) {
    const { command, roomId, roomName, roomOwer } = res

    if (!usersInRoom[roomId]) usersInRoom[roomId] = {}

    usersInRoom[roomId][socket.id] = socket.user
    socket.room = roomId
    socket.join(roomId)
}

function disconnect(socket) {
    if (socket.room) {
        delete usersInRoom[socket.room][socket.id]
    }
}

module.exports = loader
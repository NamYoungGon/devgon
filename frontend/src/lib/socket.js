let socket = null

function login(user) {
    const { email, name } = user
    
    socket = window.socket
    
    if (socket) {
        emit('login', {
            email,
            name
        })
    }
}

function connect() {
    socket = window.socket
}

function disconnect() {
    socket = null
}

function on(command, callback) {
    if (socket) {
        socket.off(command)
        socket.on(command, callback)
    }
}

function emit(command, output) {
    if (socket) {
        socket.emit(command, output)
    }
}

const socketObj = {
    on,
    emit,
    connect,
    disconnect,
    init: (user) => {
        login(user)
    }
}

module.exports = socketObj
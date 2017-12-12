let socket = null,
    isLogined = false

function login(user) {
    const { email, name, no } = user
    
    socket = window.socket

    if (socket) {
        emit('login', { email, name, no })

        isLogined = true
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

function getIsLogined() {
    return isLogined
}

function doNotify (msg) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        new Notification(msg);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
            if (permission === "granted") {
                new Notification(msg);
            }
        });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}

const socketObj = {
    on,
    emit,
    connect,
    disconnect,
    getIsLogined,
    doNotify,
    init: (user) => {
        login(user)
    }
}

module.exports = socketObj
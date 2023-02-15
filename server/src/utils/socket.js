let users = []

module.exports = (http) => {
    const socketIO = require('socket.io')(http, {
        cors: {
            origin: process.env.CLIENT_URL //address of client
        }
    })
 
    socketIO.on("connection", (socket) => {
        console.log(`${socket.id} user just connected`)

        socket.on("typing", (data) => {
            console.log("Someone is typing")
        })

        socket.on("newUser", (data) => {
            users.push(data)
            socketIO.emit("newUserResponse", users)
        })

        socket.on("message", (messageData) => {
            //maybe save to database first?
            socketIO.emit("messageResponse", messageData)
        })

        socket.on("typing", (data) => {
            socket.broadcast.emit("typingResponse", data)
        })
    })

}
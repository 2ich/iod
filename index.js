const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const port = process.env.PORT || 5000;

app.use('/server-assets', express.static(__dirname + '/assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// 60 frames per second in ms ? : 1000 / 60 == 16.66..
// 1000 / 100 == 10
const framerate = 17

function game() {
    io.emit('game', 'hello')
}

io.on('connection', (socket) => {
    console.log('Made socket connection with ID: ' + socket.id)
    io.emit('game', 'hello')

    setInterval(game, framerate)

})

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
})
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
const updaterate = Math.round(1000 / 60)

players = {}


function rint(min = 0, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}






function game() {
    //io.emit('game', 'hello')
    io.to('general').emit('game', players)
}






io.on('connection', (socket) => {
    console.log('Made socket connection with ID: ' + socket.id)
    socket.join('general')
    players[[socket.id]] = { 'pos' : { 'x' : rint(0, 200), 'y' : rint(0, 200) }}
    console.log(players)
    socket.emit('con', players)
    // io.emit('game', 'hello')
    // io.to('general').emit('game', 'general emit')

    socket.on('gack', (pos) => {
        //console.log(pos)
        players[[socket.id]]['pos']['x'] = pos['x']
        players[[socket.id]]['pos']['y'] = pos['y']
        //console.log(players)
    })

    socket.on('disconnecting', () => {
        // if (players[[socket.id]] !== undefined)
        // if (players.hasOwnProperty(socket.id))
        delete players[[socket.id]]
    })


})

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
})

setInterval(game, updaterate)
console.log("SETINTERVAL", updaterate)
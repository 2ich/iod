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
const cwidth = 1000
const cheight = 500
const bize = 24

players = {}


function rint(min = 0, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}






function game() {
    //io.emit('game', 'hello')
    io.to('general').emit('game', players)
}


objs = {
    'bushes' : []
}

for (let i = 0; i < 10; i++) {
    objs['bushes'].push({
        'x': rint(0, cwidth),
        'y': rint(0, cheight),
        'size': rint(bize + bize / 4, bize * 3)
    })
}



io.on('connection', (socket) => {
    console.log('Made socket connection with ID: ' + socket.id)
    socket.join('general')
    // players[[socket.id]] = { 'pos' : { 'x' : rint(0, 200), 'y' : rint(0, 200) }}
    players[[socket.id]] = {
        'poss' : [{
            'x' : rint(0, 200),
            'y' : rint(0, 200)
        }],
        'views' : [{
            'x' : 0,
            'y' : 0
        }],
    }
    //players[[socket.id]] = { 'lossposs' : players[[socket.id]]['poss'] }
    console.log(players)
    socket.emit('con', players, objs)
    // io.emit('game', 'hello')
    // io.to('general').emit('game', 'general emit')

    socket.on('gack', (positions) => {
        //console.log(pos)
        //players[[socket.id]]['pos']['x'] = pos['x']
        //players[[socket.id]]['pos']['y'] = pos['y']
        if (positions.length > 0) {
            //console.log('Posss if', positions)
            players[[socket.id]]['poss'] = positions
        }
        
        else {
            //console.log('Posss else', positions)
        }
        
        
        // console.log(positions)
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
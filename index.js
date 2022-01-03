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













server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
})
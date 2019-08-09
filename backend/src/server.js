const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')

const dotenv = require('dotenv'); // Ler .env
dotenv.config(); // Ler .env

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectedUsers = {}

io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
})


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(function () {
        console.log('Mongodb Conectado!');
    })
    .catch(function (err) {
        console.log('Houve um erro ao se conectar ao mongodb: ' + err);
    });

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})
app.use(cors())
app.use(express.json())
app.use(routes)


server.listen(3333, () => {
    console.log('Server Rodando!')
})


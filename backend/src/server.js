const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv'); // Ler .env
dotenv.config(); // Ler .env
const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(function () {
        console.log('Mongodb Conectado!');
    })
    .catch(function (err) {
        console.log('Houve um erro ao se conectar ao mongodb: ' + err);
    });

server.listen(3333, () => {
    console.log('Server Rodando!')
})


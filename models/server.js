const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./socket');
const cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);
        //Configuración sockets
        this.io = socketio(this.server, {});
    }

    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));    
        this.app.use(cors({
            methods: ["GET", "POST"]
        }));
    }

    initSockets() {
        new Sockets(this.io);
    }

    exucute() {

        this.middlewares();

        this.initSockets();

        this.server.listen(this.port, () => {
            console.log('Server run puerto ', this.port)
        })
    }
}

module.exports = Server;
class Sockets {

    constructor(io) {
        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', client => {
            console.log("conectado")

            {/*client.on('msj-input-server', (data) => {
                console.log(data);

                this.io.emit('msj-output-client', data);
            }); */}

            //recibimos un evento
            client.on('datos_user', datos => {
            console.log('correo: '+datos.mail + '  usuario: '+ datos.usuario);
            
            //eel servidor emite algo al cliente, primer parámetro el emit y el segundo son los datos
            //cada que u usuario se conecta, a todos los clientes conectados les llega el emtit y es escuchado por todos los clientes conectados 
            this.io.emit('nuevo_user', {user: datos.usuario});
            });

            //escuchando cuando el usuario manda mensaje
            client.on('enviarm', datos =>{
                console.log(datos.usuario+ ' esta enviando un mensaje');
                this.io.emit('nuevo_mensaje', {user: datos.usuario, mensaje: datos.mensaje});
            });

            //escuchando cuando el usuario manda un video ID
            client.on('envioVideoId', datos => {
            console.log(datos.videoId+ ' esta enviando un video Id');
            this.io.emit('nuevoVideoId', {videoId: datos.videoId});
            });
            
            //escucha eventos de control de video [pause-play]
            client.on('envioEventoControl', datos => {
                console.log(datos.eventoControl+ ' esta enviando un estado de control');
                this.io.emit('EventoControl', {eventoControl: datos.eventoControl});
                });


        });
    }

}

module.exports = Sockets;
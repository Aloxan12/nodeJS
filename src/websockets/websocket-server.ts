import { Server } from 'socket.io';

export const setupSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: ['http://localhost', 'http://localhost:3000', 'https://aloxan12.github.io'],
            methods: ["GET", "POST"],
        },
        transports: ['websocket', 'polling'],
        allowEIO3: true
    });

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('message', () => {
            socket.emit('message', ['1', '2', '3']);
        });
        // socket.on('disconnect', () => {
        //     console.log('user disconnected');
        // });
    });
};
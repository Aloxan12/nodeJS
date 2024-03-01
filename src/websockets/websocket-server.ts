import { Server } from 'socket.io';

export const setupSocketServer = (server: any) => {
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: ['http://localhost:3000', 'https://aloxan12.github.io'],
            methods: ["GET", "POST"],
        },
        pingTimeout: 60000,
        allowEIO3: true
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
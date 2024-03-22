import { Server as WebSocketServer } from 'ws';

const message = {
    id: 1,
    event: 'greeting',
    username: '',
    text: 'Добро пожаловать в чат',
};

export const setupWebSocketServer = (httpServer: any) => {
    const wsServer = new WebSocketServer({ server: httpServer });

    wsServer.on('connection', ws => {
        ws.send(JSON.stringify(message))
        ws.on('close', () => console.log('Client has disconnected!'))

        ws.on('message',  (message) => {
            wsServer.clients.forEach(client => {
                client.send(`${message}`)
            })
        })
        ws.onerror = function () {
            console.log('websocket error')
        }
    })
};
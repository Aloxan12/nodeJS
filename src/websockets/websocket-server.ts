import { Server as WebSocketServer } from 'ws';

const message = {
    id: 1,
    event: 'connection',
    username: 'alex',
    text: '1 est',
};

export const setupWebSocketServer = (server: any) => {
    const wsServer = new WebSocketServer({ server });

    wsServer.on('connection', ws => {
        ws.send(JSON.stringify(message))
        ws.on('close', () => console.log('Client has disconnected!'))
        ws.on('message', data => {
            wsServer.clients.forEach(client => {
                client.send(`${data}`)
            })
        })
        ws.onerror = function () {
            console.log('websocket error')
        }
    })
};
import { Server as WebSocketServer } from 'ws';

export const setupWebSocketServer = (server: any) => {
    console.log('server', server)
    const wsServer = new WebSocketServer({ server });

    wsServer.on('connection', ws => {
        ws.send('connection established')
        ws.on('close', () => console.log('Client has disconnected!'))
        ws.on('message', data => {
            wsServer.clients.forEach(client => {
                console.log(`distributing message: ${data}`)
                client.send(`${data}`)
            })
        })
        ws.onerror = function () {
            console.log('websocket error')
        }
    })
};
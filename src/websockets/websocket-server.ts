import { Server as WebSocketServer } from 'ws';
import {IUserDto} from "../dtos/user-dto";
import {messageRepository} from "../respositories/message-respository";

interface MessageType {
    id: number,
    event: 'connection' | 'message',
    author: IUserDto
    text: string
    chatId: string
}


const message = {
    id: 1,
    event: 'greeting',
    user: {
        name: ''
    },
    text: 'Добро пожаловать в чат',
};

export const setupWebSocketServer = (httpServer: any) => {
    const wsServer = new WebSocketServer({ server: httpServer });

    wsServer.on('connection', ws => {
        ws.send(JSON.stringify(message))
        ws.on('close', () => console.log('Client has disconnected!'))

        ws.on('message',  async (message) => {
            const messageObj: MessageType = JSON.parse(message.toString())
            if(messageObj.event === 'message'){
                console.log('meme')
                await messageRepository.createMessage(messageObj.author?.id, messageObj.text, messageObj.chatId)
            }
            wsServer.clients.forEach(client => {
                client.send(`${message}`)
            })
        })
        ws.onerror = function () {
            console.log('websocket error')
        }
    })
};
import { Server as WebSocketServer } from 'ws';
import {IUserDto} from "../dtos/user-dto";
import {messageRepository} from "../respositories/message-respository";
import {ApiError} from "../exeptions/api-error";

interface MessageType {
    id: number,
    event: 'connection' | 'message',
    author: IUserDto
    text: string
    chatId: string
}

export const setupWebSocketServer = (httpServer: any) => {
    const wsServer = new WebSocketServer({ server: httpServer });

    wsServer.on('connection', ws => {
        ws.on('close', () => console.log('Client has disconnected!'))

        ws.on('message',  async (message) => {
            const messageObj: MessageType = JSON.parse(message.toString())
            if(messageObj.event === 'message'){
                await messageRepository.createMessage(messageObj.author?.id, messageObj.text, messageObj.chatId)
            }
            wsServer.clients.forEach(client => {
                client.send(`${message}`)
            })
        })
        ws.onerror = function () {
            throw ApiError.BadRequest('Произошла ошибка')
        }
    })
};
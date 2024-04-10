import {Request, Response, NextFunction} from 'express'
import {messageRepository} from "../respositories/message-respository";

export const messageController = {
    async getMessageList(req: Request, res: Response, next: NextFunction) {
        try {
            const {search, limit, page, chatId} = req.query
            const userId = req.user.id
            const messages = await messageRepository.getAllMessages(userId as string, search as string, limit as string, page as string, chatId as string)
            return res.json(messages)
        } catch (e) {
            next(e)
        }
    },
    async createMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { author, text, chatId } = req.body
            const chat = await messageRepository.createMessage(author, text, chatId)
            return res.json(chat)
        } catch (e) {
            next(e)
        }
    },
    async deleteMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const post = await messageRepository.deleteMessage(id as string)
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
}
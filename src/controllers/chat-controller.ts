import {Request, Response, NextFunction} from 'express'
import {chatRepository} from "../respositories/chat-respository";

export const chatController = {
    async getChatList(req: Request, res: Response, next: NextFunction) {
        try {
            const {search, limit, page} = req.query
            const userId = req.user.id
            const chats = await chatRepository.getAllChats(userId as string, search as string, limit as string, page as string)
            return res.json(chats)
        } catch (e) {
            next(e)
        }
    },
    async createChat(req: Request, res: Response, next: NextFunction) {
        try {
            const { users } = req.body
            const chat = await chatRepository.createChat(users)
            return res.json(chat)
        } catch (e) {
            next(e)
        }
    },
    async deleteChat(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const post = await chatRepository.deleteChat(id as string)
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
}
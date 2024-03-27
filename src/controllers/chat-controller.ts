import {Request, Response, NextFunction} from 'express'
import {postRepository} from '../respositories/post-respository';
import {chatRepository} from "../respositories/chat-respository";

export const chatController = {
    async getChatList(req: Request, res: Response, next: NextFunction) {
        try {
            const {search, limit, page} = req.query
            const userId = req.user.id
            const posts = await chatRepository.getAllChats(search as string, limit as string, page as string, userId)
            return res.json(posts)
        } catch (e) {
            next(e)
        }
    },
    async createPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const {postText, author} = req.body
            const post = await postRepository.createPost(postText, author)
            return res.json(post)
        } catch (e) {
            next(e)
        }
    },
    async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const post = await postRepository.deletePost(id as string)
            return res.json(post)
        } catch (e) {
            next(e)
        }
    }
}
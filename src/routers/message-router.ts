import {Router} from "express";
import {postController} from '../controllers/post-controller';
import {authMiddleware} from '../middlewares/auth-middleware';
import {chatController} from "../controllers/chat-controller";


export const messageRouter = Router({})

messageRouter.get('/', authMiddleware, chatController.getChatList)
messageRouter.post('/', authMiddleware, chatController.createChat)
messageRouter.delete('/:id', authMiddleware, postController.deletePost)

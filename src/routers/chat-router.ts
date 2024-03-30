import {Router} from "express";
import {postController} from '../controllers/post-controller';
import {authMiddleware} from '../middlewares/auth-middleware';
import {chatController} from "../controllers/chat-controller";


export const chatRouter = Router({})

chatRouter.get('/', authMiddleware, chatController.getChatList)
chatRouter.post('/', authMiddleware, chatController.createChat)
chatRouter.delete('/:id', authMiddleware, postController.deletePost)

import {Router} from "express";
import {authMiddleware} from '../middlewares/auth-middleware';
import {messageController} from "../controllers/message-controller";


export const messageRouter = Router({})

messageRouter.get('/', authMiddleware, messageController.getMessageList)
messageRouter.post('/', authMiddleware, messageController.createMessage)
messageRouter.delete('/:id', authMiddleware, messageController.deleteMessage)

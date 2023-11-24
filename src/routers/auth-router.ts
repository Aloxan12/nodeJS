import { Router } from "express";
import { userController } from '../controllers/user-controller';

export const authRouter = Router({})

authRouter.post('/registration', userController.registration)
authRouter.post('/login', userController.login)
authRouter.post('/logout', userController.logout)
authRouter.get('/refresh', userController.refresh)

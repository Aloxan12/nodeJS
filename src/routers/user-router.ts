import { Router } from "express";
import { body } from 'express-validator';
import { userController } from '../controllers/user-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

export const userRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 6}).withMessage('Название должно содержать от 3 до 10 символов')

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', authMiddleware, userController.getUserDetail)
userRouter.patch('/:id', authMiddleware, userController.updateUserDetail)
userRouter.patch('/:id/uploadAvatar', authMiddleware, userController.uploadUserAvatar)
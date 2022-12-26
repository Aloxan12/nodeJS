import {Request, Response} from 'express'
import { Router } from "express";
import { body } from 'express-validator';
import { userController } from '../controllers/user-controller';
import { authMiddleware } from '../middlewares/auth-middleware';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { productsRespository } from '../respositories/products-db-respository';

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]


export const userRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 6}).withMessage('Название должно содержать от 3 до 10 символов')

userRouter.get('/',authMiddleware, userController.getAllUsers)
userRouter.get('/:id', authMiddleware, userController.getUserDetail)
userRouter.patch('/:id', authMiddleware, userController.updateUserDetail)
userRouter.patch('/:id/uploadAvatar', authMiddleware, userController.uploadUserAvatar)
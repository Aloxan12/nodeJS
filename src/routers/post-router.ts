import {Request, Response} from 'express'
import { Router } from "express";
import { body } from 'express-validator';
import { userController } from '../controllers/user-controller';
import { authMiddleware } from '../middlewares/auth-middleware';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { productsRespository } from '../respositories/products-db-respository';



export const postRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 6}).withMessage('Название должно содержать от 3 до 10 символов')

postRouter.get('/',authMiddleware, userController.getAllUsers)
postRouter.get('/:id', authMiddleware, userController.getUserDetail)
postRouter.patch('/:id', authMiddleware, userController.updateUserDetail)
postRouter.patch('/:id/uploadAvatar', authMiddleware, userController.uploadUserAvatar)
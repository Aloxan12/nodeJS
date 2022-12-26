import {Request, Response} from 'express'
import { Router } from "express";
import { body } from 'express-validator';
import { userController } from '../controllers/user-controller';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { productsRespository } from '../respositories/products-db-respository';

export const authRouter = Router({})

authRouter.post('/registration', userController.registration)
authRouter.post('/login', userController.login)
authRouter.get('/refresh', userController.refresh)

import {Request, Response} from 'express'
import { Router } from "express";
import { body } from 'express-validator';
import { userController } from '../controllers/user-controller';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { productsRespository } from '../respositories/products-db-respository';

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]


export const userRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 6}).withMessage('Название должно содержать от 3 до 10 символов')

userRouter.get('/', userController.getAllUsers)
userRouter.post('/registration', userController.registration)
userRouter.get('/:id', async (req:Request, res:Response) => {
    let product = await productsRespository.getProductById(+req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
userRouter.post('/',titleValidation,inputValidationMiddleware , async (req:Request, res:Response) => {
    const newProduct = await productsRespository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
userRouter.put('/:id',titleValidation,inputValidationMiddleware , async (req:Request, res:Response) => {
    let product = await productsRespository.updateProduct(+req.params.id, req.body.title)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
userRouter.delete('/:id', async (req:Request, res:Response) => {
    const isDeleted = await productsRespository.deleteProduct(+req.params.id)
    return isDeleted ? res.send(204) : res.send(404)
})
import {Request, Response} from 'express'
import { Router } from "express";
import { body } from 'express-validator';
import { inputValidationMiddleware } from '../middlewares/input-validation-middleware';
import { productsRespository } from '../respositories/products-db-respository';

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]


export const productRouter = Router({})

const titleValidation = body('title').trim().isLength({min: 3, max: 6}).withMessage('Название должно содержать от 3 до 10 символов')

productRouter.get('/', async (req:Request, res:Response) => {
    const foundProducts = await productsRespository.findProduct(req.query.title?.toString())
    res.send(foundProducts)
})
productRouter.get('/:id', async (req:Request, res:Response) => {
    let product = await productsRespository.getProductById(+req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
productRouter.post('/',titleValidation,inputValidationMiddleware , async (req:Request, res:Response) => {
    const newProduct = await productsRespository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productRouter.put('/:id',titleValidation,inputValidationMiddleware , async (req:Request, res:Response) => {
    let product = await productsRespository.updateProduct(+req.params.id, req.body.title)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
productRouter.delete('/:id', async (req:Request, res:Response) => {
    const isDeleted = await productsRespository.deleteProduct(+req.params.id)
    return isDeleted ? res.send(204) : res.send(404)
})
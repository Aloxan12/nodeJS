import {Request, Response} from 'express'
import { Router } from "express";
import { productsRespository } from '../respositories/products-respository';

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]


export const productRouter = Router({})

productRouter.get('/', (req:Request, res:Response) => {
    const foundProducts = productsRespository.findProduct(req.query.title?.toString())
    res.send(foundProducts)
})
productRouter.get('/:id', (req:Request, res:Response) => {
    let product = productsRespository.getProductById(+req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
productRouter.post('/', (req:Request, res:Response) => {
    const newProduct = productsRespository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})
productRouter.put('/:id', (req:Request, res:Response) => {
    let product = productsRespository.updateProduct(+req.params.id, req.body.title)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})
productRouter.delete('/:id', (req:Request, res:Response) => {
    const isDeleted = productsRespository.deleteProduct(+req.params.id)
    return isDeleted ? res.send(204) : res.send(404)
})
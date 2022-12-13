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
    let product = products.find((prod)=> prod.id === +req.params.id)
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
    let product = products.find((prod)=> prod.id === +req.params.id)
    if(product) {
        product.title = req.body.title
        res.send(product)
    }else {
        res.send(404)
    }
})
productRouter.delete('/:id', (req:Request, res:Response) => {
    for(let i = 0; i < products.length; i++){           //#1
        if(products[i].id === +req.params.id){
            products.splice(i, 1);
            res.send(201);
            return;
        }
    }
    return res.send(404)

    // const newPropucts = products.filter((prod)=> prod.id !== +req.params.id) //#2 придумать как вернуть с кодом
    // return newPropucts.length < products.length ? res.send(201) : res.send(404)
})
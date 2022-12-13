import {Request, Response} from 'express'
import { Router } from "express";

const addresses = [{id: 1, value:'Minsk'}, {id: 2,value:'London'}, {id: 3,value:'Grodno'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (req:Request, res:Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req:Request, res:Response) => {
    let address = addresses.find((address)=> address.id === +req.params.id)
    if(address) {
        res.send(address)
    }else {
        res.send(404)
    }
})
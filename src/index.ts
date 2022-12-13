import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { productRouter } from './routers/product-router'

const app = express()


const port = process.env.PORT || 3005

const addresses = [{id: 1, value:'Minsk'}, {id: 2,value:'London'}, {id: 3,value:'Grodno'}]

const parserMiddleweare = bodyParser()
app.use(parserMiddleweare)

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})


app.get('/addresses', (req:Request, res:Response) => {
    res.send(addresses)
})

app.get('/addresses/:id', (req:Request, res:Response) => {
    let address = addresses.find((address)=> address.id === +req.params.id)
    if(address) {
        res.send(address)
    }else {
        res.send(404)
    }
})

app.use('products', productRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
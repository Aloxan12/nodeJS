import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { productRouter } from './routers/product-router'
import { addressesRouter } from './routers/addresses-router'

const app = express()


const port = process.env.PORT || 3005

const parserMiddleweare = bodyParser()
app.use(parserMiddleweare)

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})

app.use('products', productRouter)
app.use('addresses', addressesRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
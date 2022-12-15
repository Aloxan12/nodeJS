import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { productRouter } from './routers/product-router'
import { addressesRouter } from './routers/addresses-router'
import { runDb } from './respositories/db'

const app = express()


const port = process.env.PORT || 3005

const parserMiddleweare = bodyParser.json()
app.use(parserMiddleweare)

app.use('products', productRouter)
app.use('addresses', addressesRouter)

const startApp = async ()=>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
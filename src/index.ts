import express, {Request, Response} from 'express'
import { productRouter } from './routers/product-router'
import { addressesRouter } from './routers/addresses-router'
import { runDb } from './respositories/db'

const app = express()
const port = process.env.PORT || 5000

const parserMiddleweare = express.json()
app.use(parserMiddleweare)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Samurai   ')
})

app.use('products', productRouter)
app.use('addresses', addressesRouter)

const startApp = async ()=>{
    try{
        await runDb()
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }catch {
        console.log('error')
    }
}

startApp()
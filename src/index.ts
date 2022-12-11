import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3005

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})

const products = [{title:'bread'}, {title:'apple'}, {title:'orange'}]
const addresses = [{value:'Minsk'}, {value:'London'}, {value:'Grodno'}]

app.get('/products', (req:Request, res:Response) => {
    res.send(products)
})

app.get('/products/:productTitle', (req:Request, res:Response) => {
    let product = products.find((prod)=> prod.title === req.params.productTitle)
    res.send(product)
})

app.get('/addresses', (req:Request, res:Response) => {
    res.send(addresses)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
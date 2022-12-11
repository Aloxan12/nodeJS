import express, {Request, Response} from 'express'

const app = express()
const port = process.env.PORT || 3005

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]
const addresses = [{id: 1, value:'Minsk'}, {id: 2,value:'London'}, {id: 3,value:'Grodno'}]

app.get('/products', (req:Request, res:Response) => {
    res.send(products)
})

app.get('/products/:productTitle', (req:Request, res:Response) => {
    let product = products.find((prod)=> prod.title === req.params.productTitle)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
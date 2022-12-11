import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()


const port = process.env.PORT || 3005

const products = [{id: 1, title:'bread'}, {id: 2,title:'apple'}, {id: 3, title:'orange'}]
const addresses = [{id: 1, value:'Minsk'}, {id: 2,value:'London'}, {id: 3,value:'Grodno'}]

const parserMiddleweare = bodyParser()
app.use(parserMiddleweare)

app.get('/', (req:Request, res:Response) => {
    let message = 'Hello World!!!!'
    res.send(message)
})
app.get('/products', (req:Request, res:Response) => {
    if(req.query.title){
        res.send(products.filter(item => item.title.indexOf(req.query.title!.toLocaleString())> -1))
    }else {
        res.send(products)
    }
})
app.post('/products', (req:Request, res:Response) => {
    const mewProduct = {id: +(new Date), title: req.body.title}
    products.push(mewProduct)
    res.status(201).send(mewProduct)
})

app.get('/products/:id', (req:Request, res:Response) => {
    let product = products.find((prod)=> prod.id === +req.params.id)
    if(product) {
        res.send(product)
    }else {
        res.send(404)
    }
})

app.put('/products/:id', (req:Request, res:Response) => {
    let product = products.find((prod)=> prod.id === +req.params.id)
    if(product) {
        product.title = req.body.title
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


app.delete('/products/:id', (req:Request, res:Response) => {
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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
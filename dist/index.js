"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
const products = [{ id: 1, title: 'bread' }, { id: 2, title: 'apple' }, { id: 3, title: 'orange' }];
const addresses = [{ id: 1, value: 'Minsk' }, { id: 2, value: 'London' }, { id: 3, value: 'Grodno' }];
const parserMiddleweare = (0, body_parser_1.default)();
app.use(parserMiddleweare);
app.get('/', (req, res) => {
    let message = 'Hello World!!!!';
    res.send(message);
});
app.get('/products', (req, res) => {
    if (req.query.title) {
        res.send(products.filter(item => item.title.indexOf(req.query.title.toLocaleString()) > -1));
    }
    else {
        res.send(products);
    }
});
app.post('/products', (req, res) => {
    const mewProduct = { id: +(new Date), title: req.body.title };
    products.push(mewProduct);
    res.status(201).send(mewProduct);
});
app.get('/products/:id', (req, res) => {
    let product = products.find((prod) => prod.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.put('/products/:id', (req, res) => {
    let product = products.find((prod) => prod.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    let address = addresses.find((address) => address.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) { //#1
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(201);
            return;
        }
    }
    return res.send(404);
    // const newPropucts = products.filter((prod)=> prod.id !== +req.params.id) //#2 придумать как вернуть с кодом
    // return newPropucts.length < products.length ? res.send(201) : res.send(404)
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

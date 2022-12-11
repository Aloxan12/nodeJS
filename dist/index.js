"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
    let message = 'Hello World!!!!';
    res.send(message);
});
const products = [{ id: 1, title: 'bread' }, { id: 2, title: 'apple' }, { id: 3, title: 'orange' }];
const addresses = [{ id: 1, value: 'Minsk' }, { id: 2, value: 'London' }, { id: 3, value: 'Grodno' }];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:productTitle', (req, res) => {
    let product = products.find((prod) => prod.title === req.params.productTitle);
    if (product) {
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
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

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
const products = [{ title: 'bread' }, { title: 'apple' }, { title: 'orange' }];
const addresses = [{ value: 'Minsk' }, { value: 'London' }, { value: 'Grodno' }];
app.get('/products', (req, res) => {
    res.send(products);
});
app.get('/products/:productTitle', (req, res) => {
    let product = products.find((prod) => prod.title === req.params.productTitle);
    res.send(product);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

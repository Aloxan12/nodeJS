"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const products_respository_1 = require("../respositories/products-respository");
const products = [{ id: 1, title: 'bread' }, { id: 2, title: 'apple' }, { id: 3, title: 'orange' }];
exports.productRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 6 }).withMessage('Название должно содержать от 3 до 10 символов');
exports.productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundProducts = yield products_respository_1.productsRespository.findProduct((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundProducts);
}));
exports.productRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_respository_1.productsRespository.getProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productRouter.post('/', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_respository_1.productsRespository.createProduct(req.body.title);
    res.status(201).send(newProduct);
}));
exports.productRouter.put('/:id', titleValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_respository_1.productsRespository.updateProduct(+req.params.id, req.body.title);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
}));
exports.productRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield products_respository_1.productsRespository.deleteProduct(+req.params.id);
    return isDeleted ? res.send(204) : res.send(404);
}));

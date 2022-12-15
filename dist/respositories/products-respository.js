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
exports.productsRespository = void 0;
const products = [{ id: 1, title: 'bread' }, { id: 2, title: 'apple' }, { id: 3, title: 'orange' }];
exports.productsRespository = {
    findProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title) {
                return products.filter(item => item.title.indexOf(title) > -1);
            }
            else {
                return products;
            }
        });
    },
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = products.find((prod) => prod.id === id);
            return product;
        });
    },
    createProduct(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = {
                id: +(new Date),
                title: title
            };
            products.push(newProduct);
            return newProduct;
        });
    },
    updateProduct(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = products.find((prod) => prod.id === id);
            if (product) {
                product.title = title;
                return product;
            }
            else {
                return null;
            }
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < products.length; i++) { //#1
                if (products[i].id === id) {
                    products.splice(i, 1);
                    return true;
                }
            }
            return false;
            // const newPropucts = products.filter((prod)=> prod.id !== +req.params.id) //#2 придумать как вернуть с кодом
            // return newPropucts.length < products.length ? res.send(201) : res.send(404)
        });
    }
};

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_router_1 = require("./routers/product-router");
const addresses_router_1 = require("./routers/addresses-router");
const cors_1 = __importDefault(require("cors"));
const dbMongo_1 = require("./respositories/dbMongo");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const parserMiddleweare = express_1.default.json();
app.use(parserMiddleweare);
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello Samurai   ');
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use('products', product_router_1.productRouter);
app.use('addresses', addresses_router_1.addressesRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbMongo_1.runDb)();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
    catch (_a) {
        console.log('error');
    }
});
startApp();

import {Router} from "express";
// import {authMiddleware} from '../middlewares/auth-middleware';
import {suggestController} from "../controllers/suggest-controller";


export const suggestRouter = Router({})

suggestRouter.get('/', suggestController.getAddressByString)

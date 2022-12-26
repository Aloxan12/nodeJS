import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {ApiError} from '../exeptions/api-error'
import { UserModel } from '../models/user-model';
import { userRespository } from '../respositories/user-respository';

export const userController = {
    async registration(req: Request, res: Response, next: NextFunction){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest("Ошибка при валидации", errors.array())
                );
            }
            const { email, password, role } = req.body;

            const userData = await userRespository.registration(email, password, role);
            console.log('userData', userData)

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userRespository.login(email, password);

            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    async getAllUsers(req: Request, res: Response, next: NextFunction){
        try {
            const users = await UserModel.find()
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}
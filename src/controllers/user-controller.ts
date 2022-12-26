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

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            //const {refreshToken} = req.cookies
            const { refreshtoken } = req.headers;

            const token = await userRespository.logout(refreshtoken as string);
            res.removeHeader("refreshToken");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshtoken } = req.headers;

            const userData = await userRespository.refresh(refreshtoken as string);

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    
    async getAllUsers(req: Request, res: Response, next: NextFunction){
        try {
            const usersData = await userRespository.getAllUsers();
            return res.json(usersData);
        } catch (e) {
            next(e);
        }
    },

    async getUserDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const users = await userRespository.getUserDetail(id);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
}
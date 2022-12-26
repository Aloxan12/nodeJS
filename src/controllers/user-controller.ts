import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {ApiError} from '../exeptions/api-error'
import {UserModel} from '../models/user-model';
import {userRespository} from '../respositories/user-respository';
import path from "path";
import fs from 'fs' ;
import {UploadedFile} from 'express-fileupload';

export const userController = {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest("Ошибка при валидации", errors.array())
                );
            }
            const {email, password, role} = req.body;

            const userData = await userRespository.registration(email, password, role);

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userRespository.login(email, password);

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshtoken} = req.headers;

            const token = await userRespository.logout(refreshtoken as string);
            res.removeHeader("refreshToken");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshtoken} = req.headers;

            const userData = await userRespository.refresh(refreshtoken as string);

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const usersData = await userRespository.getAllUsers();
            return res.json(usersData);
        } catch (e) {
            next(e);
        }
    },

    async getUserDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const users = await userRespository.getUserDetail(id);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    async updateUserDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const user = req.body;

            const users = await userRespository.updateUserDetail(id, user);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    async uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            req.files?.file

            const img = req.files?.file as UploadedFile
            let avatarName = Date.now() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "..", "src" , "uploads", avatarName));
            const user = await userRespository.uploadUserAvatar(id, avatarName);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
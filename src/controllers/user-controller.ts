import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {ApiError} from '../exeptions/api-error'
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

            res.setHeader("refreshToken", userData.refreshToken);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}
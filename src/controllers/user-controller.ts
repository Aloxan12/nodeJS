import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {ApiError} from '../exeptions/api-error'
import {userRepository} from '../respositories/user-respository';
import {uploadFile} from '../respositories/google-drive';

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

            const {refreshToken, ...userData}  = await userRepository.registration(email, password, role);
            res.cookie("refreshToken", refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
             return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const {refreshToken, ...userData} = await userRepository.login(email, password);
            res.cookie("refreshToken", refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userRepository.logout(refreshToken as string);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const {refreshToken: refreshTokenNew, ...userData}  = await userRepository.refresh(refreshToken as string);
            res.cookie("refreshToken", refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {search, limit, page} = req.query;
            const usersData = await userRepository.getAllUsers(search as string, limit as string, page as string);
            return res.json(usersData);
        } catch (e) {
            next(e);
        }
    },

    async getUserDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const users = await userRepository.getUserDetail(id);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    async updateUserDetail(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            const user = req.body;

            const users = await userRepository.updateUserDetail(id, user);
            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    async uploadUserAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            req.files?.file
            if (!!req.files?.file) {
                const photoId: string | null = await uploadFile(req.files?.file)
                if (!!photoId) {
                    const user = await userRepository.uploadUserAvatar(id, `https://drive.google.com/uc?export=view&id=${photoId}`);
                    return res.json(user);
                } else {
                    res.status(400).send({message: 'Ошибка при загрузке файла'})
                }
            }
        } catch (e) {
            next(e);
        }
    }
}
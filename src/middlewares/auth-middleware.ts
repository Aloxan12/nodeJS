import {ApiError} from '../exeptions/api-error'
import {tokenRepository} from '../respositories/token-repository'
import {Request, Response, NextFunction} from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenRepository.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }
        // @ts-ignore
        req.user = userData
        next()
    }catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
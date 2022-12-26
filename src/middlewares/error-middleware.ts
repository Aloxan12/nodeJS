import {ApiError} from '../exeptions/api-error'
import {Request, Response, NextFunction,ErrorRequestHandler} from 'express'

export const Error =(err: any, req: Request, res: Response, next: NextFunction)=> {
    if(err instanceof  ApiError){
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошбика'})
}
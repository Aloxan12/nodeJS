import {Request, Response, NextFunction} from 'express'
import {messageRepository} from "../respositories/message-respository";
import {suggestRepository} from "../respositories/suggest-respository";

export const suggestController = {
    async getAddressByString(req: Request, res: Response, next: NextFunction) {
        try {
            const {search,city, limit, offset,} = req.query
            const messages = await suggestRepository.getAddressByQuery(search as string,city as string, Number(limit || '10') as number, Number(offset ||  "0") as number)
            return res.json(messages)
        } catch (e) {
            next(e)
        }
    }
}
import {Request, Response, NextFunction} from 'express'
import {validationResult} from 'express-validator'
import {ApiError} from '../exeptions/api-error'
import {UserModel} from '../models/user-model';
import {userRespository} from '../respositories/user-respository';
import path from "path";
import fs from 'fs' ;
import {UploadedFile} from 'express-fileupload';
import { postRespository } from '../respositories/post-respository';

interface PostRequestType extends Request{
    user: {id: string}
}

export const postController = {
    async getPosts(req: PostRequestType, res: Response, next: NextFunction){
        try {
            const { search, limit, page } = req.query
            const userId = req.user.id
            const posts = await postRespository.getAllPosts(search as string, limit as string, page as string, userId)
            return res.json(posts)
        }catch (e){
            next(e)
        }
    },
    async createPosts(req: Request, res: Response, next: NextFunction){
        try {
            const {postText, author} = req.body
            const post = await postRespository.createPost(postText, author)
            return res.json(post)
        }catch (e){
            next(e)
        }
    },
    async deletePost(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params
            const post = await postRespository.deletePost(id as string)
            return res.json(post)
        }catch (e){
            next(e)
        }
    }
}
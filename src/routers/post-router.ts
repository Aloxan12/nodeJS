import {Router} from "express";
import {body} from 'express-validator';
import {postController} from '../controllers/post-controller';
import {authMiddleware} from '../middlewares/auth-middleware';


export const postRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 10
}).withMessage('Название должно содержать от 3 до 10 символов')

postRouter.get('/', authMiddleware, postController.getPosts)
postRouter.post('/', authMiddleware, postController.createPosts)
postRouter.patch('/:id/like', authMiddleware, postController.swichLikePost)
postRouter.delete('/:id', authMiddleware, postController.deletePost)

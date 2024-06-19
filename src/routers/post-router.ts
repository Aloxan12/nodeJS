import {Router} from "express";
import {postController} from '../controllers/post-controller';
import {authMiddleware} from '../middlewares/auth-middleware';


export const postRouter = Router({})

postRouter.get('/', authMiddleware, postController.getPosts)
postRouter.post('/', authMiddleware, postController.createPosts)
postRouter.patch('/:id/like', authMiddleware, postController.switchLikePost)
postRouter.delete('/:id', authMiddleware, postController.deletePost)

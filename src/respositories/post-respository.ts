import {ApiError} from "../exeptions/api-error"
import { PostModel } from "../models/post-model"
import { IPostDtoBD, PostDto } from "../dtos/post-dto"
import {filterAndSortPosts, formatPosts} from "./helpers/postHelpers";

export const postRepository = {

    async getAllPosts(search: string, limit: string | number, page: string | number, userId: string){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        const posts: IPostDtoBD[] = await PostModel.find().populate('author').populate('likes');
        const filterPosts = filterAndSortPosts(posts, search).reverse();

        const totalCount = filterPosts.length;
        const totalPages = Math.ceil(totalCount / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null ;

        return {
            prevPage,
            nextPage,
            limit,
            count: totalCount,
            results: formatPosts(filterPosts.slice(offset, offset + limit), userId)
        };
    },
    async createPost(postText: string, author: number,){
        if(postText.length > 5000){
            throw ApiError.BadRequest(`Текст не должен привышать 5000 символов`)
        }
        const post = await PostModel.create({postText, author, publicDate: new Date(), likes:[]})
        const postDto = new PostDto(post)
        return {
            post: postDto
        }
    },
    async switchLikePost(id: string, userId: string){
        const post = await PostModel.findOne({_id: id})
        const foundLike = post.likes.find((item: string) => item === userId)
        const isLike = foundLike ? post.likes.filter((item: string)=> item !== userId ) : [...post.likes, userId]
        await post.update({
            likes: isLike
        })
        const postDto = new PostDto(post)

        return { post: postDto }
    },
    async deletePost(id: string){
        const post = await PostModel.deleteOne({_id: id})

        return {status: 204, message:'Пост успешно удален', post}
    }
}
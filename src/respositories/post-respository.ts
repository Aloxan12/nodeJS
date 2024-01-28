import {ApiError} from "../exeptions/api-error"
import { PostModel } from "../models/post-model"
import { IPostDtoBD, PostDto } from "../dtos/post-dto"

export const postRepository = {
    async getAllPosts(search: string, limit: string | number, page: string | number, userId: string){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        const posts: IPostDtoBD[] = await PostModel.find().populate('author').populate('likes');
        const filterPosts = posts.filter(post => {
            return !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true
        }).reverse()

        return {
            page,
            limit,
            count: filterPosts.length,
            results: filterPosts.map((post)=> ({
                id: post._id,
                postText: post.postText,
                publicDate: post.publicDate,
                author: {
                    id:post.author.id,
                    email:post.author.email,
                    avatar:post.author.avatar
                },
                likes: post.likes.map(({email, avatar, id}) => ({email, avatar, id})),
                likeCount: post.likes.length,
                isLike: !!post.likes.find((user) => {
                    return user.id === userId
                })
            })).slice(offset,offset + limit)
        }
    },
    async createPost(postText: string, author: number,){
        if(postText.length > 5000){
            throw ApiError.BadRequest(`Текст не олжен привышать 5000 символов`)
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
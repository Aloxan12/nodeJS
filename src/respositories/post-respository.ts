import {ApiError} from "../exeptions/api-error"
import {UserModel} from "../models/user-model"
import bcrypt from "bcrypt"
import {productsCollection, ProductType} from "./dbMongo"
import {mailRepository} from "./mail-repository"
import {tokenRepository} from "./token-repository"
import {IUserDto, RoleType, UserDto, IUserDtoBD} from "../dtos/user-dto"
import mongodb from 'mongodb'
import { PostModel } from "../models/post-model"
import { IPostDto, IPostDtoBD, PostDto } from "../dtos/post-dto"

export const postRespository = {
    async getAllPosts(search: string, limit: string | number, page: string | number, userId: string){
        page = page || 1
        limit = limit || 5
        let offset = +page * +limit - +limit
        const posts: IPostDtoBD[] = await PostModel.find().populate('author');
        const filterPosts = posts.filter(post => {
            return !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true
        }).reverse()

        return {
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
                likes: post.likes,
                likeCount: post.likes.length,
                isLike: !!post.likes.find((item) => {
                    return item === userId
                })
            })).slice(offset,Number(offset) + Number(limit))
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
    async swichLikePost(id: string, userId: string){
        const post = await PostModel.findOne({_id: id})
        const foundLike = post.likes.find((item: string) => item === userId)
        const isLike = foundLike ? post.likes.filter((item: string)=> item !== userId ) : [...post.likes, userId]
        await post.update({
            likes: isLike
        })

        return {status: 200, message:'Лайк поставлен/удален', isLike}
    },
    async deletePost(id: string){
        const post = await PostModel.deleteOne({_id: id})

        return {status: 204, message:'Пост успешно удален', post}
    }
}
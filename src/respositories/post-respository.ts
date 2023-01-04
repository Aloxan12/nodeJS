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
    async getAllPosts(search: string, limit: string | number, page: string | number){
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
            })).slice(offset,Number(offset) + Number(limit))
        }
    },
    async createPost(postText: string, author: number,){
        if(postText.length > 5000){
            throw ApiError.BadRequest(`Текст не олжен привышать 5000 символов`)
        }
        const post = await PostModel.create({postText, author, publicDate: new Date()})
        const postDto = new PostDto(post)
        return {
            post: postDto
        }
    },
    async deletePost(id: string){
        const post = await PostModel.deleteOne({_id: id})

        return {status: 204, message:'Пост успешно удален', post}
    }
}
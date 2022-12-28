import {ApiError} from "../exeptions/api-error"
import {UserModel} from "../models/user-model"
import bcrypt from "bcrypt"
import {productsCollection, ProductType} from "./dbMongo"
import {mailRepository} from "./mail-repository"
import {tokenRepository} from "./token-repository"
import {IUserDto, RoleType, UserDto, IUserDtoBD} from "../dtos/user-dto"
import mongodb from 'mongodb'
import { PostModel } from "../models/post-model"
import { IPostDto, IPostDtoBD } from "../dtos/post-dto"

export const postRespository = {
    async getAllPosts(search: string, limit: string | number, page: string | number){
        page = page || 1
        limit = limit || 5
        let offset = +page * +limit - +limit
        const posts: IPostDtoBD[] = await PostModel.find()
        const filterPosts = posts.filter(post => {
            return !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true
        }).reverse()

        return {
            count: filterPosts.length,
            results: filterPosts.map((post)=> ({
                id: post._id,
                postText: post.postText,
                publicDate: post.publicDate,
                author: post.author,
            })).slice(offset,Number(offset) + Number(limit))
        }
    },
}
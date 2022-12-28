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
        // return posts
    },
    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenRepository.generateTokens({...userDto})
        await tokenRepository.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    },

    async logout(refreshToken: string) {
        const token = await tokenRepository.removeToken(refreshToken)
        return token
    },
    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData: IUserDto = tokenRepository.validateRefreshToken(refreshToken) as IUserDto
        const tokenFromDb = await tokenRepository.findToken(refreshToken)
        if (!userData && !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenRepository.generateTokens({...userDto})
        await tokenRepository.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    },

    async getAllUsers() {
        const usersBD = await UserModel.find()
        const users = usersBD.map((user: IUserDtoBD) => ({
            id: user._id,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated,
            avatar: user.avatar,
            status: user.status
        }))
        return users
    },

    async getUserDetail(id: string) {
        const user = await UserModel.findOne({_id: id})
        if (!!user) {
            return {
                id: user._id,
                email: user.email,
                role: user.role,
                isActivated: user.isActivated,
                avatar: user.avatar,
                status: user.status
            }
        } else {
            throw ApiError.BadRequest('Пользователь не найден')
        }
    },

    async updateUserDetail(id: string, user: UserDto) {
        const currentUser = await UserModel.findOne({_id: id})
        await currentUser.update({
            id: currentUser._id,
            email: currentUser.email,
            role: currentUser.role,
            isActivated: currentUser.isActivated,
            avatar: currentUser.avatar,
            status: !!user.status ? user.status : currentUser.status
        })
        if (!!currentUser) {
            return {
                id: currentUser._id,
                email: currentUser.email,
                role: currentUser.role,
                isActivated: currentUser.isActivated,
                avatar: currentUser.avatar,
                status: !!user.status ? user.status : currentUser.status
            }
        } else {
            throw ApiError.BadRequest('Пользователь не найден')
        }
    },

    async uploadUserAvatar(id: string, avatar: string){
        try {
            const user = await UserModel.findOne({_id: id})
            await user.update({
                avatar: avatar,
            })
            return ({
                avatar: avatar,
            })
        }catch (e) {
            console.log(e)
        }
    }
}
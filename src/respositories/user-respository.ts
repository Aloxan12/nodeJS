import { ApiError } from "../exeptions/api-error"
import { UserModel } from "../models/user-model"
import bcrypt from "bcrypt"
import { productsCollection, ProductType } from "./dbMongo"
import { mailRepository } from "./mail-repository"
import { tokenRepository } from "./token-repository"
import {IUserDto, RoleType, UserDto } from "../dtos/user-dto"

export const userRespository = {
    async registration(email: string, password: string, role: RoleType ){
        const candidate = await UserModel.findOne({email})
        if(!!candidate){
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом - ${email}  уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = new Date()

        const user = await UserModel.create({email, password: hashPassword, activationLink, role})
        // await mailRepository.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenRepository.generateTokens({...userDto})
        await tokenRepository.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    },
    async login (email: string, password: string){
        const user = await UserModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
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

    async logout(refreshToken: string){
        const token = await tokenRepository.removeToken(refreshToken)
        return token
    },
    async refresh(refreshToken: string){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData: IUserDto = tokenRepository.validateRefreshToken(refreshToken) as IUserDto
        const tokenFromDb = await tokenRepository.findToken(refreshToken)
        if(!userData && !tokenFromDb){
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

    
}
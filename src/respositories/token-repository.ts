import { tokenModel } from "../models/token-model"
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import { IUserDto } from "../dtos/user-dto";

dotenv.config()

export const tokenRepository = {
    generateTokens(payload: any){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    },
    validateAccessToken(token: string){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string)
            return userData as IUserDto
        }catch (e) {
            console.log('e',e)
            return null
        }
    },
    validateRefreshToken(token: string){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string)
            return userData as IUserDto
        }catch (e) {
            return null
        }
    },

    async saveToken(userId: string, refreshToken: string){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    },
    async removeToken(refreshToken: string){
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    },

    async findToken(refreshToken: string){
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    },
}
import { ApiError } from "../exeptions/api-error"
import { UserModel } from "../models/user-model"
import bcrypt from "bcrypt"
import { productsCollection, ProductType } from "./dbMongo"
import { mailRepository } from "./mail-repository"
import { tokenRepository } from "./token-repository"
import { RoleType, UserDto } from "../dtos/user-dto"

export const userRespository = {
    async registration(email: string, password: string, role: RoleType ){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом - ${email}  уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = new Date()

        const user = await UserModel.create({email, password: hashPassword, activationLink, role})
        await mailRepository.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenRepository.generateTokens({...userDto})
        await tokenRepository.saveToken(userDto.id, tokens.refreshToken)
        console.log('userDto', userDto)
        console.log('tokens', tokens)
        return {
            ...tokens,
            user: userDto
        }
    },
    async getProductById(id: number){
        let product: ProductType | null = await productsCollection.findOne({id: id})
        return product
    },
    async createProduct(title: string){
        const newProduct = {
            id: +(new Date), 
            title: title}
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string){
        const result = await productsCollection.updateOne({id:id},{$set:{title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number){
       const result =  await productsCollection.deleteOne({id:id})
        return result.deletedCount === 1
    }
}
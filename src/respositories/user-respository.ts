import {ApiError} from "../exeptions/api-error"
import {UserModel} from "../models/user-model"
import bcrypt from "bcrypt"
import {tokenRepository} from "./token-repository"
import {IUserDto, RoleType, UserDto, IUserDtoBD} from "../dtos/user-dto"

export const userRepository = {
    async registration(email: string, password: string, role: RoleType) {
        const candidate = await UserModel.findOne({email})
        if (!!candidate) {
            throw ApiError.BadRequest(`Пользователь с таким почтовым адресом - ${email}  уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = Date.now().toString()
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
            throw ApiError.UnauthorizedError('refreshToken' + refreshToken,)
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

    async getAllUsers(search:string, limit:string | number, page:string | number) {
        page = +page || 1
        limit = +limit || 10
        let offset: number = page * limit - limit
        const total = await UserModel.find().count()
        const searchParams = !!search ? {email: {'$regex': search}} : {}
        const usersBD = await UserModel.find(searchParams).skip(offset).limit(limit)

        const users = usersBD.map((user: IUserDtoBD) => ({
            id: user._id,
            email: user.email,
            role: user.role,
            isActivated: user.isActivated,
            avatar: user.avatar,
            status: user.status
        }))

        return {
            count: total,
            results: users
        }
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
            return user
        }catch (e) {
            console.log(e)
        }
    }
}
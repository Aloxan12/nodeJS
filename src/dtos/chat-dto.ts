import {IUserDto} from "./user-dto";

export interface IChatDtoBD {
    postText: string
    author: IUserDto
    publicDate: string
    _id: string
    likes: IUserDto[]
    isLike: boolean
    likeCount: number
}

export interface IChatDto {
    postText: string
    author: IUserDto
    publicDate: string
    id: string
    likes: string[]
    likeCount: number
    isLike: boolean
}

export class ChatDto {
    postText;
    author;
    publicDate;
    id;
    likes;
    isLike;
    likeCount;

    constructor(model: IChatDtoBD) {
        this.postText = model.postText
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
        this.likes = model.likes
        this.isLike = model.isLike
        this.likeCount = model.likeCount
    }
}
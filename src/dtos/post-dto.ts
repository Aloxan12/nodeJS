import {IUserDto} from "./user-dto";

export enum RoleType {
    'ADMIN' = 'ADMIN',
    'USER' = 'USER',
}

export interface IPostDtoBD {
    postText: string
    author: IUserDto
    publicDate: string
    _id: string
    likes: string[]
}

export interface IPostDto {
    postText: string
    author: IUserDto
    publicDate: string
    id: string
    likes: string[]
    likeCount: number
    isLike: boolean
}

export class PostDto {
    postText;
    author;
    publicDate;
    id;
    likes;

    constructor(model: IPostDtoBD) {
        this.postText = model.postText
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
        this.likes = model.likes
    }
}
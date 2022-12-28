import { IUserDto } from "./user-dto";

export enum RoleType {
    'ADMIN' = 'ADMIN',
    'USER' = 'USER',
}

export interface IPostDtoBD{
    postText: string
    author: IUserDto
    publicDate: string
    _id: string
}

export interface IPostDto{
    postText: string
    author: IUserDto
    publicDate: string
    id: string
}

export class PostDto {
    postText;
    author;
    publicDate;
    id;

    constructor(model: IPostDtoBD) {
        this.postText = model.postText
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
    }
}
import {IUserDto, IUserDtoBD} from "./user-dto";

export interface IChatDtoBD {
    _id: string
    users: IUserDtoBD[]
    dateLastMessage: string
}

export interface IChatDto {
    id: string
    users: IUserDto[]
    dateLastMessage: string
}

export class ChatDto {
    id;
    users;
    dateLastMessage;

    constructor(model: IChatDtoBD) {
        this.id = model._id
        this.users = model.users
        this.dateLastMessage = model.dateLastMessage
    }
}
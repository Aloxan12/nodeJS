import {IUserDto} from "./user-dto";

export interface IMessageDtoBD {
    _id: string
    text: string
    author: IUserDto
    publicDate: string
    chatId: string
}

export interface IMessageDto {
    id: string
    text: string
    author: string
    publicDate: string
    chatId: string
}

export class MessageDto {
    id;
    text;
    author;
    publicDate;
    chatId;

    constructor(model: IMessageDtoBD) {
        this.text = model.text
        this.chatId = model.chatId
        this.id = model._id
        this.author = model.author
        this.publicDate = model.publicDate
    }
}
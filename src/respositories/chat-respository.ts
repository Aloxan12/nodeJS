import { ChatModel } from "../models/chat-model";
import {IChatDtoBD} from "../dtos/chat-dto";
import {ApiError} from "../exeptions/api-error";
import {PostModel} from "../models/post-model";

export const chatRepository = {
    async getAllChats(search: string, limit: string | number, page: string | number){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        const chats: IChatDtoBD[] = await ChatModel.find().populate('users');

        const totalCount = chats.length;
        const totalPages = Math.ceil(totalCount / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null ;

        return {
            prevPage,
            nextPage,
            count: totalCount,
            results: chats.slice(offset, offset + limit)
        };
    },

    async createChat(users: string[]){

        const chat = await ChatModel.create({users})
        await chat.populate({
            path: 'users',
            select: '-password -__v -activationLink',
        });
        return {
            chat
        }
    },
}
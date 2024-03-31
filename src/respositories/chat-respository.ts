import { ChatModel } from "../models/chat-model";
import {IChatDtoBD} from "../dtos/chat-dto";
import {formatChat} from "./helpers/chatHelpers";

export const chatRepository = {
    async getAllChats(userId: string, search: string, limit: string | number, page: string | number){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        const chats: IChatDtoBD[] = await ChatModel.find().find({ 'users._id': userId }).populate('users');
        console.log('chats', chats)
        const totalCount = chats.length;
        const totalPages = Math.ceil(totalCount / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null ;

        const formatChatResult = formatChat(chats.slice(offset, offset + limit))
        console.log('formatChatResult', formatChatResult)
        return {
            prevPage,
            nextPage,
            count: totalCount,
            results: formatChatResult
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
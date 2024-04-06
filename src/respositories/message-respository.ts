import { ChatModel } from "../models/chat-model";
import {IChatDtoBD} from "../dtos/chat-dto";
import {formatChat} from "./helpers/chatHelpers";
import {ObjectId} from "mongodb";
import {MessageModel} from "../models/message-model";

export const messageRepository = {
    async getAllMessages(userId: string, search: string, limit: string | number, page: string | number){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        // Фильтрация чатов по пользователю userId
        const chats: IChatDtoBD[] = await ChatModel.find({ 'users': { $elemMatch: { $eq: new ObjectId(userId) } } }).populate('users')

        const totalCount = chats.length;
        const totalPages = Math.ceil(totalCount / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null ;

        const formatChatResult = formatChat(chats.slice(offset, offset + limit))

        return {
            prevPage,
            nextPage,
            count: totalCount,
            results: formatChatResult
        };
    },

    async createMessage(author: string, text: string, chatId?: string){
        const newMessage = {
            text,
            author,
            publicDate: new Date(),
            chatId,
        }
        const message = await MessageModel.create(newMessage)
        await message.populate({
            path: 'author',
            select: '-password -__v -activationLink -status',
        });

        return {
            message
        }
    },
}
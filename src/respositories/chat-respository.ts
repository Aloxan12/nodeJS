import { IPostDtoBD } from "../dtos/post-dto"
import { ChatModel } from "../models/chat-model";

export const chatRepository = {
    async getAllChats(search: string, limit: string | number, page: string | number, userId: string){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)
        const chats: IPostDtoBD[] = await ChatModel.find().populate('author').populate('likes');

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
}
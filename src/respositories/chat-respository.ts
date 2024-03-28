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

    async createChat(postText: string, author: number,){

        const post = await ChatModel.create({postText, author, publicDate: new Date(), likes:[]})
        await post.populate({
            path: 'author',
            select: '-password -__v -activationLink',
        });
        const postDto = {...post,isLike: false, likeCount: 0  }
        return {
            post: postDto
        }
    },
}
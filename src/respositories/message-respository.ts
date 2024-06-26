import {MessageModel} from "../models/message-model";
import {formatMessage} from "./helpers/messageHelpers";
import {IMessageDtoBD} from "../dtos/messages-dto";


export const messageRepository = {
    async getAllMessages(userId: string, search: string, limit: string | number, page: string | number, chatId?: string){
        page = Number(page || 1)
        limit = Number(limit || 5)
        let offset = Number(page * limit - limit)

        let query = MessageModel.find();

        // Если есть chatId, добавляем фильтр по chatId, иначе фильтруем по null
        if (chatId) {
            query.where('chatId').equals(chatId);
        } else {
            query.where('chatId').equals(null);
        }
        query.sort({ publicDate: -1 });
        // Фильтрация чатов по пользователю userId
        const messages: IMessageDtoBD[] = await query.populate('author');

        const totalCount = messages.length;
        const totalPages = Math.ceil(totalCount / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null ;

        const formatMessagesResult = formatMessage(messages.slice(offset, offset + limit))

        return {
            prevPage,
            nextPage,
            count: totalCount,
            results: formatMessagesResult
        };
    },

    async createMessage(author: string, text: string, chatId?: string){
        const newMessage = {
            text,
            author,
            publicDate: new Date(),
            chatId,
        }
        const message = await MessageModel.create({...newMessage})
        await message.populate({
            path: 'author',
            select: '-password -__v -activationLink -status',
        });

        return {
            message
        }
    },
    async deleteMessage(id: string){
        const chat = await MessageModel.deleteOne({_id: id})
        return {status: 204, message:'Сообщение успешно удален', chat}
    },
}
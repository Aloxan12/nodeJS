import {IMessageDtoBD} from "../../dtos/messages-dto";

export const formatMessage =(messages: IMessageDtoBD[]) => messages.map(message => {
        const authorData = message?.author ? {
            id: message.author.id,
            email: message.author.email,
            avatar: message.author?.avatar,
        } : null

        return {
            id: message._id,
            text: message.text,
            publicDate: message.publicDate,
            author: authorData,
        };
    });

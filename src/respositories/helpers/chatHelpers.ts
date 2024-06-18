import {IChatDtoBD} from "../../dtos/chat-dto";

export const formatChat =(chats: IChatDtoBD[]) => chats.map(chat => {
        const formattedUsers = chat.users.map(user => ({
            id: user._id,
            email: user.email,
            avatar: user.avatar,
        }));

        return {
            id: chat._id,
            users: formattedUsers,
        };
    });

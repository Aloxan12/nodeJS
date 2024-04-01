import {IPostDtoBD} from "../../dtos/post-dto";
import {IChatDtoBD} from "../../dtos/chat-dto";

export function filterAndSortPosts(posts: IPostDtoBD[], search: string): IPostDtoBD[] {
    return posts.filter(post => !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true);
}

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

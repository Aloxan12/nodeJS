import {IPostDtoBD} from "../../dtos/post-dto";
import {IChatDtoBD} from "../../dtos/chat-dto";

export function filterAndSortPosts(posts: IPostDtoBD[], search: string): IPostDtoBD[] {
    return posts.filter(post => !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true);
}

export function formatChat(chats: IChatDtoBD[]) {
    return chats.map(({_id, ...chat}) => ({...chat, id: _id, users: chat.users.map((_id, ...user) => ({...user, id: _id})) }));
}
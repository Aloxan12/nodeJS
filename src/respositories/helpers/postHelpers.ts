import {IPostDtoBD} from "../../dtos/post-dto";

export function filterAndSortPosts(posts: IPostDtoBD[], search: string): IPostDtoBD[] {
    return posts.filter(post => !!search ? post.postText.toLowerCase().includes(search.toLowerCase()) : true);
}

export function formatPosts(posts: IPostDtoBD[], userId: string) {
    return posts.map((post) => ({
        id: post._id,
        postText: post.postText,
        publicDate: post.publicDate,
        author: {
            id: post.author.id,
            email: post.author.email,
            avatar: post.author.avatar
        },
        likes: post.likes.map(({ email, avatar, id }) => ({ email, avatar, id })),
        likeCount: post.likes.length,
        isLike: !!post.likes.find((user) => user.id === userId)
    }));
}
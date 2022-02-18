import PostLayout from '@includes/layouts/PostsLayout/posts'
import { getPostBySlug, getAllPosts } from "@api"

export default function Post(props) {
    return <PostLayout
        title={props.content.title}
        content={props.content.content}
        posts={props.posts}
        coverImage={props.content.coverImage}
        date={props.content.date}
        author={props.content.author}
        ogImage={props.content.ogImage}
    />
}

export async function getStaticProps(context) {
    const allPosts = await getAllPosts()
    return {
        props:{
            content: await getPostBySlug(context.params.slug),
            posts: allPosts,

        }
    }
}

export async function getStaticPaths() {
    let paths = await getAllPosts()
    paths = paths.map(post => ({
        params: { slug:post.slug }
    }));
    return {
        paths: paths,
        fallback: false
    }
}
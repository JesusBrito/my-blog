import DefaultLayout from '@includes/layouts/default'
import Link from 'next/link'
import { getConfig, getAllPosts } from '@api'

export default function Blog(props) {
    return (
        <DefaultLayout title={props.title} description={props.description}>
            <p>List of posts:</p>
            <ul className="text-lg cursor-pointer">
                {props.posts.map(function(post, idx) {
                    return (
                        <li key={idx}>
                            <Link href={'/posts/'+post.slug}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </DefaultLayout>
    )
}

export async function getStaticProps() {
    const config = await getConfig()
    const allPosts = await getAllPosts()
    return {
        props: {
            posts: allPosts,
            title: config.title,
            description: config.description
        }
    }
}
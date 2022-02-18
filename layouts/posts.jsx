import DefaultLayout from '@layouts/default'
import Head from 'next/head'
import Link from 'next/link'
import {DiscussionEmbed} from "disqus-react";
import styles from '../styles/layouts/posts_layout.module.scss'
import Header from "@includes/header";
import Footer from "@includes/footer";
import PostHeader from "@includes/post-header";
import htmlToReactElement from "../lib/htmlToReactElement";

export default function PostLayout(props) {
    return (
        <DefaultLayout>
            <div className={styles.posts_layout__grid_container}>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <Header/>
                <aside className={styles.posts_layout__sidenav}>
                    <div>
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
                    </div>
                </aside>

                <article className={styles.posts_layout__main}>
                    <main className={styles.posts_layout__wrapper_container}>
                        <div className={styles.posts_layout__main_container}>
                            <PostHeader
                                title={props.title}
                                coverImage={props.coverImage}
                                date={props.date}
                                author={props.author}
                            />
                            {/*<ReactMarkdown plugins={[gfm]} children={props.content} />*/}
                            {/*<div dangerouslySetInnerHTML={{__html: props.content}}/>*/}
                            <div>{    htmlToReactElement(props.content || '')
                                }</div>
                            <hr/>
                            <div><Link href='/'><a>Home</a></Link></div>


                            <section className={styles.posts_layout__disqus_container}>
                                <DiscussionEmbed
                                    shortname='blog-jesusbritodeveloper'
                                    config={
                                        {
                                            url: "https://blog-jesusbritodeveloper.disqus.com/embed.js",
                                            identifier: props.title,
                                            title: "Comentarios",
                                            language: 'es_MX' //e.g. for Traditional Chinese (Taiwan)
                                        }
                                    }
                                />
                            </section>
                        </div>
                    </main>

                </article>
                <Footer/>
            </div>
        </DefaultLayout>
    )
}
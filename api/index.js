import matter from 'gray-matter'
import yaml from 'js-yaml'
import markdownToHtml from "../lib/markdownToHtml";

export async function getConfig() {
    const config = await import(`../config.yml`)
    return yaml.load(config.default)
}

export async function getAllPosts() {
    const context = require.context('../posts', false, /\.md$/)
    const posts = []
    for(const key of context.keys()){
        const post = key.slice(2);
        const content = await import(`../posts/${post}`);
        const meta = matter(content.default)
        posts.push({
            slug: post.replace('.md',''),
            title: meta.data.title
        })
    }
    return posts;
}

export async function getPostBySlug(slug, fields = []) {
    const fileContent = await import(`../posts/${slug}.md`)
    const { data, content } = matter(fileContent.default)
    const html = await markdownToHtml(content || '')

    return {
        title: data.title,
        content: html,
        coverImage: data.coverImage,
        date: data.date,
        author: data.author,
        ogImage: data.ogImage,
    }
}


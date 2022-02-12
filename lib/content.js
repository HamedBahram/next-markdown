import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export const getPostData = slug => {
    const realSlug = slug.replace(/\.md$/, '')
    const filePath = path.join(contentDirectory, `${realSlug}.md`)
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
    const { data, content } = matter(fileContent)
    return { slug: realSlug, meta: data, content }
}

export const getAllPosts = () => {
    const slugs = fs.readdirSync(contentDirectory)
    return slugs.map(slug => getPostData(slug))
}

export const getAllSlugs = () => {
    const files = fs.readdirSync(contentDirectory)
    return files.map(file => file.replace(/\.md$/, ''))
}

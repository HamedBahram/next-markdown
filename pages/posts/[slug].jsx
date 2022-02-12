import Head from 'next/head'
import { useRouter } from 'next/router'
import { getAllSlugs, getPostData } from '../../lib/content'
import markdownToHtml from '../../lib/markdownToHtml'

const Post = ({ post }) => {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Fallback...</div>
    }

    return (
        <>
            <Head>
                <link
                    rel='stylesheet'
                    href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css'
                />
            </Head>
            <article className='prose p-8'>
                <h1>{post.meta.title}</h1>
                <p>{post.meta.description}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                <div>{post.meta.author}</div>
                <time>{post.meta.date}</time>
            </article>
        </>
    )
}

export async function getStaticPaths() {
    const slugs = getAllSlugs()
    const paths = slugs.map(slug => ({ params: { slug } }))

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const { slug } = params
    const post = getPostData(slug)

    if (!post) {
        return {
            notFound: true,
        }
    }

    const content = await markdownToHtml(post.content || '')
    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export default Post

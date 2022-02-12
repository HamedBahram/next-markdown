import Link from 'next/link'
import { getAllPosts } from '../lib/content'

const Home = ({ posts }) => {
    return (
        <div className='p-8'>
            <h1 className='text-3xl font-semibold mb-4'>Welcome to my corner</h1>
            <h2 className='text-2xl font-medium mb-4'>Here are all my posts</h2>
            <ul className='flex gap-4'>
                {posts.map(post => (
                    <li key={post.slug} className='flex-1 shadow p-4 rounded-md'>
                        <Link href={`/posts/${post.slug}`}>
                            <a>
                                <h3 className='text-xl font-medium mb-3'>{post.meta.title}</h3>
                                <small>{post.meta.description}</small>
                                <p>{post.meta.author}</p>
                                <time>{post.meta.date}</time>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    const posts = getAllPosts()

    return {
        props: {
            posts,
        },
    }
}

export default Home

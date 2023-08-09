import groq from 'groq'

import type { IPost } from '@/api/Types'
import PostTile from '@/molecules/PostTile'

import client from '../../client'

const getRecentPosts = async (): Promise<IPost[] | null> => {
    const posts: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title != "Interieur" && showOnHome != true] | order(publishedAt desc)[0..3]
    `)

    if (!posts) {
        return null
    }

    return posts
}

const HomepageRecentPosts = async (): Promise<JSX.Element> => {
    const posts = await getRecentPosts()

    if (!posts) {
        return <></>
    }

    return (
        <div className="mt-4 mb-10">
            <div className="flex flex-col">
                {posts.map((post) => {
                    return <PostTile post={post} key={post._id} />
                })}
            </div>
        </div>
    )
}

export default HomepageRecentPosts

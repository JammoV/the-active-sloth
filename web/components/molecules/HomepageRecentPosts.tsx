import type { FC } from 'react'

import type { IPost } from '@/api/Types'
import PostTile from '@/molecules/PostTile'

interface HomepageRecentPostsProps {
    posts: IPost[]
}

const HomepageRecentPosts: FC<HomepageRecentPostsProps> = ({ posts }) => (
    <div className="mt-4 mb-10">
        <div className="flex flex-col">
            {posts.map((post) => {
                return <PostTile post={post} key={post._id} />
            })}
        </div>
    </div>
)

export default HomepageRecentPosts

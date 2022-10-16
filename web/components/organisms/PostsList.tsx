import type { FC } from 'react'
import React from 'react'

import type { IPost } from '@/api/Types'
import Container from '@/atoms/Container'
import PostHero from '@/molecules/PostHero'

interface PostsListProps {
    posts: IPost[]
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
    return (
        <Container>
            {posts.map((post, index) => (
                <PostHero post={post} key={post._id} index={index} />
            ))}
        </Container>
    )
}

export default PostsList

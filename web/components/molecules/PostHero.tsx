import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { IPost } from '@/api/Types'

import client from '../../client'
import { getPostDescription } from '../../lib/PostFunctions'

interface PostHeroProps {
    post: IPost
    index: number
}

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

const PostHero: FC<PostHeroProps> = ({ post, index }) => (
    <Link href="/posts/[slug]" as={`/posts/${post.slug.current}`}>
        <div className="flex flex-col hover:cursor-pointer md:mb-6 md:flex-row">
            <div className="md:min-w-[505px]">
                <Image
                    src={urlFor(post.mainImage)
                        .width(505)
                        .height(342)
                        .quality(100)
                        .url()}
                    width={505}
                    height={342}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    alt={post.title}
                    priority={index === 0}
                />
            </div>
            <div className="flex flex-col justify-center py-4 md:p-8">
                <h3 className="text-xl md:text-2xl font-roboto font-medium mb-1 md:mb-4">
                    {post.title}
                </h3>
                <p>{getPostDescription(post.body)}</p>
            </div>
        </div>
    </Link>
)

export default PostHero

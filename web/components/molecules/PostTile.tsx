import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { urlFor } from '../../lib/PostFunctions'

import type { IPost } from '@/api/Types'

interface PostTileProps {
    post: IPost
}

const PostTile: FC<PostTileProps> = ({ post }) => (
    <div className="relative my-4">
        <Image
            src={urlFor(post.mainImage)
                .width(900)
                .height(350)
                .quality(100)
                .url()}
            layout="responsive"
            width={900}
            height={350}
            loading="lazy"
            alt={post.title}
        />
        <Link href="/post/[slug]" as={`/post/${post.slug.current}`}>
            <div className="bg-gradient-to-t from-black/80 w-full h-full absolute z-20 top-0 text-white hover:from-black/90 hover:cursor-pointer">
                <div className="text-white absolute bottom-0 p-4 md:p-8">
                    <span className="md:text-lg drop-shadow-md">
                        Reis artikel
                    </span>
                    <h3 className="md:text-3xl font-medium md:py-2 pt-0 drop-shadow-md">
                        {post.title}
                    </h3>
                    <span className="hidden md:block md:text-xl drop-shadow-md">
                        {post.publishedAt}
                    </span>
                </div>
            </div>
        </Link>
    </div>
)

export default PostTile

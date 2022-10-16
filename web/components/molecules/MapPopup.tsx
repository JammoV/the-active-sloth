import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { IPost } from '@/api/Types'
import Button from '@/atoms/Button'

import { urlFor } from '../../lib/PostFunctions'

interface MapPopupProps {
    post: IPost | null
    active: boolean
}

const MapPopup: FC<MapPopupProps> = ({ post, active }) => {
    return (
        <div
            className={`absolute left-0 bottom-0 m-4 md:m-0 md:bottom-auto md:top-20 md:left-20 bg-sandy z-50 rounded-2xl p-4 md:p-8 shadow-xl transition-vertical md:transition-horizontal ${
                active ? 'bottom-0 md:left-20' : '-bottom-full md:-left-full'
            }`}
        >
            {post && active && (
                <div className="w-full md:w-[300px]">
                    <Image
                        src={urlFor(post.mainImage)
                            .width(500)
                            .height(150)
                            .url()}
                        objectFit={'cover'}
                        objectPosition={'center'}
                        width={500}
                        height={150}
                        alt={post.title}
                    />
                    <h4 className="font-medium my-1 md:my-2 text-base">
                        {post.title}
                    </h4>
                    <Link href="/post/[slug]" as={`/post/${post.slug.current}`}>
                        <a>
                            <Button text="Artikel lezen" size={'sm'} />
                        </a>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default MapPopup

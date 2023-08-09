import Image from 'next/image'
import type { FC } from 'react'

import type { IPost } from '@/api/Types'
import Container from '@/atoms/Container'
import HeroPostDescription from '@/molecules/HeroPostDescription'
import Waves from '@/molecules/Waves'

import { urlFor } from '../../lib/PostFunctions'

interface HeroPostProps {
    post: IPost
    withLink?: boolean
}

const HeroPost: FC<HeroPostProps> = ({ post, withLink = false }) => {
    return (
        <div className={`max-w-[2400px] mx-auto relative`}>
            <Image
                src={urlFor(post.mainImage).width(2400).height(800).url()}
                className="z-0"
                alt={post.title}
                priority={true}
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className="bg-gradient-to-r from-black/50 to-black/20 w-full h-full absolute"></div>
            <Container>
                <HeroPostDescription post={post} withLink={withLink} />
            </Container>
            <div className="absolute bottom-0 h-8 md:h-20 w-full">
                <Waves
                    imgSources={[
                        '/images/waves/wave_7.svg',
                        '/images/waves/wave_8.svg',
                    ]}
                />
            </div>
        </div>
    )
}

export default HeroPost

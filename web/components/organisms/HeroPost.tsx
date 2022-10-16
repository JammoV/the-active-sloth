import Image from 'next/image'
import type { FC } from 'react'

import type { IPost } from '@/api/Types'
import Container from '@/atoms/Container'
import HeroPostDescription from '@/molecules/HeroPostDescription'

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
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
                className="z-0"
                alt={post.title}
                priority={true}
            />
            <div className="bg-gradient-to-r from-black/50 to-black/20 w-full h-full absolute"></div>
            <Container>
                <HeroPostDescription post={post} withLink={withLink} />
            </Container>
            <div className="absolute bottom-0 h-12 md:h-28 w-full">
                <Image
                    src="/images/waves/wave_7.svg"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'top'}
                    alt="Decorative wave"
                />
            </div>
            <div className="absolute bottom-0 h-8 md:h-20 w-full">
                <Image
                    src="/images/waves/wave_8.svg"
                    layout={'fill'}
                    objectFit={'cover'}
                    objectPosition={'top'}
                    alt="Decorative wave"
                />
            </div>
        </div>
    )
}

export default HeroPost

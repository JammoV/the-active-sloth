import groq from 'groq'
import Link from 'next/link'
import React from 'react'


import type { IPost } from '@/api/Types'
import Button from '@/atoms/Button'
import CenteredHeader from '@/atoms/CenteredHeader'
import Container from '@/atoms/Container'
import HomepageRecentPosts from '@/molecules/HomepageRecentPosts'
import Waves from '@/molecules/Waves'
import About from '@/organisms/About'
import HeroPost from '@/organisms/HeroPost'

import client from '../client'

const getPrimaryPost = async (): Promise<IPost> => {
    const primaryPost: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && showOnHome == true]
    `)

    if (!primaryPost) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return primaryPost[0]
}

const Page = async (): Promise<JSX.Element> => {
    const primaryPost = await getPrimaryPost()

    return (
        <>
            {primaryPost && <HeroPost post={primaryPost} withLink={true} />}

            <About />

            <div className="relative w-full h-16 md:h-28">
                <div className="absolute bottom-0 h-16 md:h-28 w-full">
                    <Waves imgSources={['/images/waves/wave_6.svg']} />
                </div>
            </div>
            <div className="bg-sand">
                <Container>
                    <CenteredHeader title="Recente reis artikelen" />
                    {/* @ts-expect-error Server Component */}
                    <HomepageRecentPosts />
                    <div className="text-center pb-8">
                        <Link href={`/posts`}>
                            <Button text="Bekijk alle reisartikelen" />
                        </Link>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Page

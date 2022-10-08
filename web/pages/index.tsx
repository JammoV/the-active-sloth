import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'
import React from 'react'

import client from '../client'

import type { NextPageWithLayout } from './_app'

import type { IPost } from '@/api/Types'
import Button from '@/atoms/Button'
import Container from '@/atoms/Container'
import Generic from '@/layouts/Generic'
import HomepageRecentPosts from '@/molecules/HomepageRecentPosts'
import About from '@/organisms/About'
import HeroPost from '@/organisms/HeroPost'
import CenteredHeader from '@/atoms/CenteredHeader'

const Index: NextPageWithLayout<{ primaryPost: IPost | null, posts: IPost[] }> = ({ primaryPost, posts }) => {
    return (
        <>
            <Head>
                <title>{`The Active Sloth`}</title>
            </Head>
            {
                primaryPost && <HeroPost post={primaryPost} withLink={true} />
            }

            <About />

            <div className="relative w-full h-16 md:h-28">
                <div className="absolute bottom-0 h-16 md:h-28 w-full">
                    <Image
                        src="/images/waves/wave_6.svg"
                        layout={'fill'}
                        objectFit={'cover'}
                        objectPosition={'center'}
                    />
                </div>
            </div>
            <div className="bg-sand">
                <Container>
                    <CenteredHeader title="Recente reis artikelen" />
                    <HomepageRecentPosts posts={posts.slice(0, 3)} />
                    <div className="text-center pb-8">
                        <Link href={`/posts`}>
                            <a>
                                <Button text="Bekijk alle reisartikelen" />
                            </a>
                        </Link>
                    </div>
                </Container>
            </div>
        </>
    )
}

Index.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    primaryPost: IPost
    posts: IPost[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const primaryPost: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && showOnHome == true]
    `)
    const posts: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title != "Interieur" && showOnHome != true] | order(publishedAt desc)[0..3]
    `)
    return {
        props: {
            primaryPost: primaryPost[0] ?? null,
            posts,
        },
    }
}

export default Index

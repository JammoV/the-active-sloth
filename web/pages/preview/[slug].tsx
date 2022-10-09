import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import React from 'react'

import type { IPost } from '@/api/Types'
import Container from '@/atoms/Container'
import Generic from '@/layouts/Generic'
import HeroPost from '@/organisms/HeroPost'

import client from '../../client'
import portableComponents from '../../lib/PortableComponents'
import type { NextPageWithLayout } from '../_app'

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

const Post: NextPageWithLayout<{ post: IPost }> = ({ post }) => {
    const router = useRouter()
    if (!post) return null

    return (
        <>
            <Head>
                <title>{`Room of Clouds - ${post.title}`}</title>
                <meta name="robots" content="noindex,nofollow" />
            </Head>
            <HeroPost post={post} />
            <Container>
                <article>
                    <div>
                        <PortableText
                            value={post.body}
                            components={portableComponents}
                        />
                        <div className="text-center">
                            <button
                                onClick={(): void => router.back()}
                                className={`hover:cursor-pointer mt-4 text-lg border-b-4 border-b-green-light hover:border-b-green-primary`}
                            >
                                Terug
                            </button>
                        </div>
                    </div>
                </article>
            </Container>
        </>
    )
}

Post.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    post: IPost
}

export const getServerSideProps: GetServerSideProps<ResultData> = async (
    context
) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const post: IPost = await client.fetch(query, { slug })
    return {
        props: {
            post,
        },
    }
}
export default Post

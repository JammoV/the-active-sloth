import groq from 'groq'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import type { IPost } from '@/api/Types'
import Container, { PageType } from '@/atoms/Container'
import PostBody from '@/molecules/PostBody'
import HeroPost from '@/organisms/HeroPost'

import client from '../../../client'

export const revalidate = 1200

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

const getPost = async (slug: string): Promise<IPost> => {
    // const slug = context.params?.slug as string
    const post: IPost = await client.fetch(query, { slug })

    if (!post) {
        throw new Error('Failed to fetch data')
    }

    return post
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = await getPost(params.slug)

    return {
        title: post.title,
    }
}

const Page = async ({
    params,
}: {
    params: { slug: string }
}): Promise<JSX.Element> => {
    const post = await getPost(params.slug)

    return (
        <>
            <HeroPost post={post} />
            <Container pageType={PageType.BLOGPOST}>
                <article>
                    <div className="my-12">
                        <PostBody body={post.body} />
                        <div className="text-center">
                            <Link
                                href={'/posts'}
                                className={`hover:cursor-pointer mt-4 text-lg border-b-4 border-b-sand hover:border-b-orange`}
                            >
                                Bekijk alle posts
                            </Link>
                        </div>
                    </div>
                </article>
            </Container>
        </>
    )
}

export default Page

const getPaths = async (): Promise<string[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const paths = await getPaths()

    return paths.map((slug) => ({
        slug: slug,
    }))
}

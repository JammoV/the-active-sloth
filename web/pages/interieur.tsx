import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React from 'react'

import type { IPost } from '@/api/Types'
import Generic from '@/layouts/Generic'

import client from '../client'
import portableComponents from '../lib/PortableComponents'

import type { NextPageWithLayout } from './_app'

const Interieur: NextPageWithLayout<{ post: IPost }> = ({ post }) => {
    if (!post) return null

    const { title = 'Missing title', body = [] } = post

    return (
        <>
            <Head>
                <title>{`The Active Sloth - ${title}`}</title>
            </Head>
            <article>
                <div>
                    <h1 className="font-yuji text-3xl sm:text-5xl mt-12 mb-8">
                        {title}
                    </h1>
                    <PortableText
                        value={body}
                        components={portableComponents}
                    />
                </div>
            </article>
        </>
    )
}

Interieur.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    post: IPost
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title == "Interieur"] | order(publishedAt desc)[0...1]
    `)
    return {
        props: {
            post: posts[0],
        },
    }
}

export default Interieur

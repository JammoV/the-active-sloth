import groq from 'groq'
import React from 'react'

import type { ICategory, IPost } from '@/api/Types'
import CenteredHeader from '@/atoms/CenteredHeader'
import Container from '@/atoms/Container'
import PostsWithFilter from '@/organisms/PostsWithFilter'

import client from '../../client'

const getPosts = async (): Promise<IPost[]> => {
    const posts: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title != "Interieur"] | order(publishedAt desc)
    `)

    if (!posts) {
        throw new Error('Failed to fetch data')
    }

    return posts
}

const getCategories = async (): Promise<ICategory[]> => {
    const categories: ICategory[] = await client.fetch(groq`
      *[_type == "category" && title != "Interieur"]
    `)

    if (!categories) {
        throw new Error('Failed to fetch data')
    }

    return categories
}

const Page = async (): Promise<JSX.Element> => {
    const posts = await getPosts()
    const categories = await getCategories()

    return (
        <>
            <Container>
                <div className="mt-8 mb-2">
                    <CenteredHeader title="Alle reis artikelen" />
                </div>
            </Container>
            <PostsWithFilter posts={posts} categories={categories} />
        </>
    )
}

export default Page

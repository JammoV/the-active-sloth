import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useEffect, useState } from 'react'

import type { ICategory, IPost } from '@/api/Types'
import CenteredHeader from '@/atoms/CenteredHeader'
import Container from '@/atoms/Container'
import Generic from '@/layouts/Generic'
import PostHero from '@/molecules/PostHero'

import client from '../client'

import type { NextPageWithLayout } from './_app'

const Posts: NextPageWithLayout<{
    posts: IPost[]
    categories: ICategory[]
}> = ({ posts, categories }) => {
    const [activePosts, setActivePosts] = useState<IPost[]>(posts)
    const [categoryFilter, setCategoryFilter] = useState<ICategory | null>(null)

    const handleCategoryFilterChange = (category: ICategory): void => {
        if (category._id === categoryFilter?._id) {
            setCategoryFilter(null)
        } else {
            setCategoryFilter(category)
        }
    }

    useEffect(() => {
        if (categoryFilter) {
            const newPosts = posts.filter((post) => {
                const matchingCategories = post.categories.filter(
                    (category: ICategory) => {
                        return category._ref === categoryFilter._id
                    }
                )
                return matchingCategories.length > 0
            })
            setActivePosts(newPosts)
        } else {
            setActivePosts(posts)
        }
    }, [categoryFilter, posts])

    return (
        <>
            <Head>
                <title>Room of Clouds - Alle reis artikelen</title>
            </Head>
            <Container>
                <div className="mt-8 mb-2">
                    <CenteredHeader title="Alle reis artikelen" />
                </div>
                {categories && (
                    <div className="flex flex-wrap md:flex-row justify-center mb-8">
                        <span className="font-medium pr-2">Filter op:</span>
                        {categories.map((category: ICategory) => (
                            <span
                                key={category.title}
                                className={`px-2 cursor-pointer hover:underline ${
                                    category._id === categoryFilter?._id
                                        ? 'bg-orange rounded-full'
                                        : ''
                                } `}
                                onClick={(): void =>
                                    handleCategoryFilterChange(category)
                                }
                            >
                                {category.title}
                            </span>
                        ))}
                    </div>
                )}
                {activePosts.map((post) => (
                    <PostHero post={post} key={post._id} />
                ))}
            </Container>
        </>
    )
}

Posts.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    posts: IPost[]
    categories: ICategory[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts: IPost[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title != "Interieur"] | order(publishedAt desc)
    `)
    const categories: ICategory[] = await client.fetch(groq`
      *[_type == "category"]
    `)

    return {
        props: {
            posts,
            categories,
        },
    }
}

export default Posts

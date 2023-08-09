'use client'

import { Wrapper } from '@googlemaps/react-wrapper'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

import type { ICategory, IPost } from '@/api/Types'
import Container from '@/atoms/Container'
import CategoryFilter from '@/molecules/CategoryFilter'
import MapViewButtons from '@/molecules/MapViewButtons'
import PostsList from '@/organisms/PostsList'
import PostsMap from '@/organisms/PostsMap'

interface PostsWithFilterProps {
    posts: IPost[]
    categories: ICategory[]
}

const PostsWithFilter: FC<PostsWithFilterProps> = ({ posts, categories }) => {
    const [activePosts, setActivePosts] = useState<IPost[]>(posts)
    const [categoryFilter, setCategoryFilter] = useState<ICategory | null>(null)
    const [mapView, setMapView] = useState<boolean>(false)

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
            <Container>
                <div className="flex flex-col sm:flex-row justify-between items-center border-b border-b-gray-200 pb-4 gap-2 my-4">
                    <CategoryFilter
                        categories={categories}
                        activeCategory={categoryFilter}
                        clickHandler={handleCategoryFilterChange}
                    />
                    <MapViewButtons
                        activeView={mapView ? 'map' : 'list'}
                        onClick={(mapView): void => setMapView(mapView)}
                    />
                </div>
            </Container>

            {mapView ? (
                <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
                    <PostsMap
                        posts={activePosts}
                        categoryFilter={categoryFilter}
                    />
                </Wrapper>
            ) : (
                <PostsList posts={activePosts} />
            )}
        </>
    )
}

export default PostsWithFilter

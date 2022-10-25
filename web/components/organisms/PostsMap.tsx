import type { FC } from 'react'
import { useRef, useState, useEffect, cloneElement } from 'react'

import type { ICategory, IPost } from '@/api/Types'
import MapPopup from '@/molecules/MapPopup'
import type { MarkerProps } from '@/molecules/Marker'
import Marker from '@/molecules/Marker'

import MapStyles from '../../lib/MapStyles'

interface PostsMapProps extends google.maps.MapOptions {
    categoryFilter: ICategory | null
    onClick?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void
    posts: IPost[]
}

type CategoryFilterMap = {
    [key: string]: {
        center: google.maps.LatLngLiteral
        zoom: number
    }
}

const categoryFilterMap: CategoryFilterMap = {
    ['Azië']: {
        center: {
            lat: 2.5166884,
            lng: 109.0245782,
        },
        zoom: 5,
    },
    ['Europa']: {
        center: {
            lat: 48.779301,
            lng: 9.10717572,
        },
        zoom: 5,
    },
    ['Amerika']: {
        center: {
            lat: 33.8616226,
            lng: 63.2124532,
        },
        zoom: 3,
    },
    ['Overig']: {
        center: {
            lat: 33.8616226,
            lng: 63.2124532,
        },
        zoom: 3,
    },
}

const PostsMap: FC<PostsMapProps> = ({ posts, categoryFilter = null }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()
    const [activePost, setActivePost] = useState<IPost | null>(null)

    const onMarkerClick = (options: MarkerProps): void => {
        const post = posts.find((post) => post._id === options.id)
        setActivePost(null)

        if (post) {
            setTimeout((): void => {
                setActivePost(post)
            }, 500)

            if (options.position) {
                map?.setCenter(options.position)
                map?.setZoom(5)
            }
        }
    }

    useEffect(() => {
        if (categoryFilter) {
            if (categoryFilterMap[categoryFilter.title]) {
                map?.setCenter(categoryFilterMap[categoryFilter.title].center)
                map?.setZoom(categoryFilterMap[categoryFilter.title].zoom)
            }
        } else {
            map?.setCenter(categoryFilterMap['Overig'].center)
            map?.setZoom(categoryFilterMap['Overig'].zoom)
        }
    }, [categoryFilter, map])

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center: {
                        lat: 33.8616226,
                        lng: 63.2124532,
                    },
                    zoom: 3,
                    styles: MapStyles,
                })
            )
        }
    }, [ref, map])

    return (
        <div className="relative">
            <MapPopup post={activePost} active={activePost !== null} />
            <div>
                <div ref={ref} className="w-full min-h-[600px]" />
                {posts.flatMap((post: IPost) => {
                    if (!post.coords) {
                        return []
                    }

                    return cloneElement(
                        <Marker
                            key={post._id}
                            position={{
                                lat: post.coords.lat,
                                lng: post.coords.lng,
                            }}
                            icon={{
                                url:
                                    activePost?._id === post._id
                                        ? 'images/MarkerActive.png'
                                        : 'images/Marker.png',
                                scaledSize: new google.maps.Size(25, 34),
                            }}
                            clickable={true}
                            title={post.title}
                            opacity={1}
                            id={post._id}
                            onClick={onMarkerClick}
                        />,
                        { map }
                    )
                })}
            </div>
        </div>
    )
}

export default PostsMap

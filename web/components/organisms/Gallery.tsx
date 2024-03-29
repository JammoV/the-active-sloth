import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityAsset } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import type { FC } from 'react'

import client from '../../client'

const imageHeight = 400
const imageWidth = 450
const imageLandscapeWidth = 900

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

const getImageWidth = (length: number, index: number): number => {
    if (length % 2 == 0) {
        return imageWidth
    }

    if (length === 1) {
        return imageLandscapeWidth
    }

    if ([2, 4, 6, 8].includes(index)) {
        return imageLandscapeWidth
    }

    return imageWidth
}

const getImageClass = (width: number, index: number): string => {
    if (width === imageLandscapeWidth) {
        return 'flex-2'
    }

    if ([0, 3, 5].includes(index)) {
        return 'flex-1 mr-2 mb-4'
    }

    if ([1, 4, 6].includes(index)) {
        return 'flex-1 ml-2 mb-4'
    }

    return 'flex-1 m-2'
}

const getGalleryClass = (display: GalleryDisplay): string => {
    switch (display) {
        case GalleryDisplay.DEFAULT:
            return 'flex flex-wrap my-4'
        case GalleryDisplay.INLINE:
            return 'flex flex-row my-4'
        case GalleryDisplay.STACKED:
        default:
            return 'flex flex-col my-4'
    }
}

export interface SanityAssetExtended extends SanityAsset {
    title: string
    alt: string
}

interface GalleryProps {
    images: SanityAssetExtended[]
    display?: string
}

export enum GalleryDisplay {
    DEFAULT = '',
    INLINE = 'inline',
    STACKED = 'stacked',
}

const Gallery: FC<GalleryProps> = ({ images, display }) => {
    const imagesLength = images.length

    if (display === GalleryDisplay.INLINE && images.length < 5) {
        const imageWidth = imageLandscapeWidth / images.length

        return (
            <div className={getGalleryClass(display)}>
                {images.map((image) => (
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    <div className="mx-2 first:ml-0 last:mr-0" key={image._key}>
                        <Image
                            alt={image.alt}
                            width={imageWidth}
                            height={550}
                            quality={100}
                            // @ts-ignore
                            src={urlFor(image as string)
                                .width(imageWidth)
                                .height(550)
                                .quality(100)
                                .url()}
                        />
                    </div>
                ))}
            </div>
        )
    }

    if (display === GalleryDisplay.STACKED) {
        const imageWidth = imageLandscapeWidth

        return (
            <div className={getGalleryClass(display)}>
                {images.map((image) => (
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    <div className="my-2 first:mt-0 last:mb-0" key={image._key}>
                        <Image
                            width={imageWidth}
                            height={imageHeight}
                            quality={100}
                            alt={image.alt}
                            // @ts-ignore
                            src={urlFor(image as string)
                                .width(imageWidth)
                                .height(imageHeight)
                                .quality(100)
                                .url()}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={getGalleryClass(GalleryDisplay.DEFAULT)}>
            {images.map((image, index) => {
                const imageWidth = getImageWidth(imagesLength, index)
                const flexClass = getImageClass(imageWidth, index)

                return (
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    <div className={flexClass} key={image._key}>
                        <Image
                            width={imageWidth}
                            height={imageHeight}
                            alt={image.alt}
                            quality={100}
                            // @ts-ignore
                            src={urlFor(image as string)
                                .width(imageWidth)
                                .height(imageHeight)
                                .quality(100)
                                .url()}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery

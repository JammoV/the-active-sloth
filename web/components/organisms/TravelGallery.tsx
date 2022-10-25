import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import Image from 'next/image'
import type { FC } from 'react'
import { useState } from 'react'

import type { ILocationImage } from '@/api/Types'
import type { SanityAssetExtended } from '@/organisms/Gallery'

import client from '../../client'

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

interface TravelGalleryProps {
    images: ILocationImage[]
}

const TravelGallery: FC<TravelGalleryProps> = ({ images }) => {
    const [mainImage, setMainImage] = useState<SanityAssetExtended>(images[0])

    return (
        <div className="flex flex-col-reverse sm:flex-row mb-6">
            <div className="flex flex-row sm:flex-col sm:w-1/4">
                {images.map((image) => (
                    <div
                        className={`mr-4 border-2 hover:border-green-primary hover:cursor-pointer ${
                            image === mainImage
                                ? 'border-green-primary'
                                : 'border-white'
                        }`}
                        key={image._key as string}
                        onClick={(): void => setMainImage(image)}
                    >
                        <Image
                            alt={image.alt}
                            title="Bekijk in het groot"
                            width={300}
                            height={150}
                            quality={100}
                            // @ts-ignore
                            src={urlFor(image as string)
                                .width(300)
                                .height(150)
                                .quality(100)
                                .url()}
                        />
                    </div>
                ))}
            </div>
            <div className="sm:w-3/4 sm:pl-8">
                <div className="relative">
                    <img
                        // @ts-ignore
                        src={urlFor(mainImage as string)
                            .width(800)
                            .quality(100)
                            .url()}
                        alt={mainImage.alt}
                        className="float-right border-8 border-orange"
                    />
                </div>
            </div>
        </div>
    )
}

export default TravelGallery

import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

import client from '../client'

import type { PortableText } from '@/api/Types'

export function getPostDescription(postBody: PortableText[]): string {
    const blocks = postBody
        ? postBody.filter(
              (block) => block._type === 'block' && block.style == 'normal'
          )
        : []

    if (blocks[0].children.length > 0) {
        const spanChildren = blocks[0].children.filter(
            (record) => record._type === 'span'
        )

        if (spanChildren.length > 0) {
            const text = spanChildren[0].text

            if (text.length > 180) {
                return `${text.substring(0, 180)}...`
            }

            return text
        }
    }

    return ''
}

export function urlFor(source: string): ImageUrlBuilder {
    return imageUrlBuilder(client).image(source)
}

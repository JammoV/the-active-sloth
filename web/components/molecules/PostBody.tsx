import { PortableText } from '@portabletext/react'
import type { FC } from 'react'
import React from 'react'

import type { PortableText as PortableTextType } from '@/api/Types'
import TableOfContents from '@/molecules/TableOfContents'

import portableComponents from '../../lib/PortableComponents'

interface PostBodyProps {
    body: PortableTextType[]
}

const PostBody: FC<PostBodyProps> = ({ body }) => {
    const tableOfContents = body.flatMap((component) => {
        if (!['h2', 'h3'].includes(component.style)) return []

        if (component.children.length == 0) return []

        return {
            level: component.style,
            text: component.children[0].text,
            identifier: component._key,
        }
    })

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12">
            <div className="md:w-2/3">
                <PortableText value={body} components={portableComponents} />
            </div>
            {tableOfContents && (
                <div>
                    <TableOfContents headers={tableOfContents} />
                </div>
            )}
        </div>
    )
}

export default PostBody

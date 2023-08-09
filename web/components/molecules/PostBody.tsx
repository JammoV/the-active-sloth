import { PortableText } from '@portabletext/react'
import type { FC } from 'react'
import React from 'react'

import type { PortableText as PortableTextType } from '@/api/Types'

import portableComponents from '../../lib/PortableComponents'

interface PostBodyProps {
    body: PortableTextType[]
}

const PostBody: FC<PostBodyProps> = ({ body }) => {
    return <PortableText value={body} components={portableComponents} />
}

export default PostBody

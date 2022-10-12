import type {
    PortableTextComponents,
    PortableTextTypeComponentProps,
} from '@portabletext/react'
import type { PortableTextMarkComponentProps } from '@portabletext/react/src/types'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import BlockQuote from '@/atoms/BlockQuote'
import Header, { HeaderType } from '@/atoms/Header'
import type { TipProps } from '@/atoms/Tip'
import Tip from '@/atoms/Tip'
import Gallery from '@/organisms/Gallery'

import client from '../client'

interface GalleryProps {
    value: {
        images: SanityImageSource[]
        display?: string
        title?: string
        description?: string
    }
}

interface LinkProps {
    _type: string
    href: string
    text: string
}

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

const portableComponents: PortableTextComponents = {
    types: {
        gallery: (props: GalleryProps): JSX.Element => {
            return (
                <Gallery
                    // @ts-ignore
                    images={props.value.images}
                    display={props.value.display}
                    title={props.value.title || ''}
                    description={props.value.description || ''}
                />
            )
        },
        tip: ({ value }: PortableTextTypeComponentProps<TipProps>) => (
            <Tip type={value.type} text={value.text} />
        ),
        image: ({ value }: { value: string }) => (
            <div className="mb-8">
                <img src={urlFor(value).width(852).url()} alt="" />
            </div>
        ),
        line: () => <hr className="my-8 border-orange" />,
    },
    list: {
        number: ({ children }) => <ol className="my-4">{children}</ol>,
        bullet: ({ children }) => <ul className="my-4">{children}</ul>,
    },
    listItem: {
        number: ({ children }) => (
            <li className="list-decimal pl-2 ml-8 text-lg">{children}</li>
        ),
        bullet: ({ children }) => (
            <li className="list-disc pl-2 ml-8 text-lg">{children}</li>
        ),
    },
    marks: {
        highlight: ({ children }) => (
            <span className="highlight">{children}</span>
        ),
        link: ({ value, text }: PortableTextMarkComponentProps<LinkProps>) => (
            <a
                className="text-green-primary font-medium hover:underline"
                href={value?.href}
            >
                {text}
            </a>
        ),
    },
    block: {
        h2: ({ children }) => <Header type={HeaderType.H2}>{children}</Header>,
        h3: ({ children }) => <Header type={HeaderType.H3}>{children}</Header>,
        h4: ({ children }) => <Header type={HeaderType.H4}>{children}</Header>,
        blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    },
}

export default portableComponents

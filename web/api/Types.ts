import type { SanityAssetExtended } from '@/organisms/Gallery'

export interface IPost {
    _id: string
    title: string
    slug: {
        current: string
    }
    showOnHome: boolean
    publishedAt: string
    categories: ICategory[]
    authorImage: string
    mainImage: string
    body: PortableText[]
    name: string
    coords: {
        lat: number
        lng: number
    }
}

export interface ICategory {
    _id: string
    _ref: string
    _type: string
    title: string
    description: string
}

export interface PortableText {
    _key: string
    _type: string
    style: string
    markDefs: string[]
    children: Record[]
}

export interface Record {
    _key: string
    _type: string
    marks: string[]
    text: string
}

export interface ILocation {
    _id: string
    location: string
    subtitle: string
    slug: {
        current: string
    }
    arrived: boolean
    sort_order: number
    arrival_date: string
    description: string
    expected_arrival_date: string
    publishedAt: string
    body: PortableText[]
    coords: {
        lat: number
        lng: number
    }
    images: ILocationImage[]
    notes: INote[]
}

export interface ILocationImage extends SanityAssetExtended {
    image: string | SanityAssetExtended
    caption: string
}

export interface INote {
    note: string
    url: string
}

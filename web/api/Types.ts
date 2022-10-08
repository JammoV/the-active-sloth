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

export interface Location {
    _id: string
    location: string
    subtitle: string
    slug: {
        current: string
    }
    publishedAt: string
    body: PortableText[]
    coords: {
        lat: number
        lng: number
    }
}

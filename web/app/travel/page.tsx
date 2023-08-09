import groq from 'groq'
import React from 'react'

import type { ILocation } from '@/api/Types'
import TravelMap from '@/organisms/TravelMap'

import client from '../../client'

const getLocations = async (): Promise<ILocation[]> => {
    const locations: ILocation[] = await client.fetch(groq`
      *[_type == "travel_location"] | order(sort_order asc)
    `)

    if (!locations) {
        throw new Error('Failed to fetch data')
    }

    return locations
}

const Page = async (): Promise<JSX.Element> => {
    const locations = await getLocations()

    return (
        <>
            <TravelMap locations={locations} />
        </>
    )
}

export default Page

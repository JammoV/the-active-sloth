import { Wrapper } from '@googlemaps/react-wrapper'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React from 'react'

import type { Location } from '@/api/Types'
import CenteredHeader from '@/atoms/CenteredHeader'
import Generic from '@/layouts/Generic'
import Map from '@/organisms/Map'

import client from '../client'

import type { NextPageWithLayout } from './_app'

const Travel: NextPageWithLayout<{ locations: Location[] }> = ({
    locations,
}) => {
    return (
        <>
            <Head>
                <title>{`The Active Sloth - Travel`}</title>
            </Head>
            <main>
                <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
                    <div className="py-10">
                        <CenteredHeader title="Coming soon!" />
                    </div>
                    <Map locations={locations} />
                </Wrapper>
            </main>
        </>
    )
}

Travel.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    locations: Location[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const locations: Location[] = await client.fetch(groq`
      *[_type == "travel_location"] | order(arrival_date desc)
    `)
    return {
        props: {
            locations,
        },
    }
}

export default Travel

import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import type { ReactElement } from 'react'
import React, { useState } from 'react'

import type { ILocation } from '@/api/Types'
import Container from '@/atoms/Container'
import Generic from '@/layouts/Generic'
import type { MarkerProps } from '@/molecules/Marker'
import Map from '@/organisms/Map'
import TravelGallery from '@/organisms/TravelGallery'

import client from '../client'
import portableComponents from '../lib/PortableComponents'

import type { NextPageWithLayout } from './_app'

const Travel: NextPageWithLayout<{ locations: ILocation[] }> = ({
    locations,
}) => {
    const [activeLocation, setActiveLocation] = useState<ILocation | null>(null)

    const onMarkerClick = (options: MarkerProps): void => {
        const location = locations.find(
            (location) => location._id === options.id
        )

        if (location) {
            setActiveLocation(location)
        }
    }

    return (
        <>
            <Head>
                <title>{`The Active Sloth - Travel`}</title>
            </Head>
            <main className="flex flex-col">
                <Map locations={locations} onMarkerClick={onMarkerClick} />
                <div className="bg-sand text-center">
                    <Container>
                        {activeLocation && (
                            <div className="p-12">
                                <h2 className="text-3xl mb-4 font-merienda">
                                    {activeLocation.location}
                                </h2>

                                {activeLocation.arrived ? (
                                    <>
                                        <p className="italic">
                                            Aankomstdatum:
                                        <br />
                                        {new Date(
                                            activeLocation.arrival_date
                                        ).toLocaleDateString('nl', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                        </p>
                                        <PortableText
                                            value={activeLocation.body}
                                            components={portableComponents}
                                        />
                                        {activeLocation.images && (
                                            <TravelGallery
                                                images={activeLocation.images}
                                            />
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <p className="italic">

                                            Verwachte aankomstdatum:

                                            <br />

                                            {new Date(

                                                activeLocation.expected_arrival_date

                                            ).toLocaleDateString('nl', {

                                                year: 'numeric',

                                                month: 'long',

                                                day: 'numeric',

                                            })}

                                        </p>
                                        <p className="font-medium">
                                            Binnenkort meer!
                                        </p>
                                    </>
                                )}
                            </div>
                        )}
                    </Container>
                </div>
            </main>
        </>
    )
}

Travel.getLayout = function getLayout(page: ReactElement): ReactElement {
    return <Generic>{page}</Generic>
}

interface ResultData {
    locations: ILocation[]
}

export const getServerSideProps: GetServerSideProps<ResultData> = async () => {
    const locations: ILocation[] = await client.fetch(groq`
      *[_type == "travel_location"] | order(sort_order asc)
    `)

    return {
        props: {
            locations,
        },
    }
}

export default Travel

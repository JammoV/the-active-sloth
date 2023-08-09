'use client'

import { Wrapper } from '@googlemaps/react-wrapper'
import type { FC } from 'react'
import React, { useState } from 'react'

import type { ILocation } from '@/api/Types'
import Container from '@/atoms/Container'
import type { MarkerProps } from '@/molecules/Marker'
import PostBody from '@/molecules/PostBody'
import Map from '@/organisms/Map'
import TravelGallery from '@/organisms/TravelGallery'

interface TravelMapProps {
    locations: ILocation[]
}

const TravelMap: FC<TravelMapProps> = ({ locations }) => {
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
            <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
                <Map locations={locations} onMarkerClick={onMarkerClick} />
            </Wrapper>

            <Container>
                {activeLocation && (
                    <div className="my-12 md:px-12">
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
                                <PostBody body={activeLocation.body} />
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
                                <p className="font-medium">Binnenkort meer!</p>
                            </>
                        )}
                    </div>
                )}
            </Container>
        </>
    )
}

export default TravelMap

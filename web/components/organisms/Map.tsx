import type { FC } from 'react'
import { useRef, useState, useEffect, cloneElement } from 'react'

import type { Location } from '@/api/Types'
import Marker from '@/molecules/Marker'

import MapStyles from '../../lib/MapStyles'

interface MapProps extends google.maps.MapOptions {
    onClick?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void
    locations: Location[]
}

const Map: FC<MapProps> = ({ locations }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center: {
                        lat: 20.689952,
                        lng: -87.6536673,
                    },
                    zoom: 8,
                    styles: MapStyles,
                })
            )
        }
    }, [ref, map])

    const paths = new google.maps.Polyline({
        path: locations.map((location: Location) => {
            return {
                lat: location.coords.lat,
                lng: location.coords.lng,
            }
        }),
        geodesic: true,
        strokeColor: '#666666',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        draggable: false,
    })
    // @ts-ignore
    paths.setMap(map)

    return (
        <>
            <div ref={ref} className="w-full h-[500px]" />
            {locations.map((location: Location) => {
                // set the map prop on the child component
                return cloneElement(
                    <Marker
                        position={{
                            lat: location.coords.lat,
                            lng: location.coords.lng,
                        }}
                        icon={{
                            url: 'images/MarkerActive.png',
                            scaledSize: new google.maps.Size(25, 34),
                        }}
                        clickable={true}
                        postId={location._id}
                        onClick={(): void => undefined}
                    />,
                    { map }
                )
            })}
        </>
    )
}

export default Map

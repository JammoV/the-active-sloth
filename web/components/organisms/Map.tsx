import type { FC } from 'react'
import { useRef, useState, useEffect, cloneElement } from 'react'

import type { ILocation } from '@/api/Types'
import type { MarkerProps } from '@/molecules/Marker'
import Marker from '@/molecules/Marker'

import MapStyles from '../../lib/MapStyles'

interface MapProps extends google.maps.MapOptions {
    onMarkerClick: (options: MarkerProps) => void
    locations: ILocation[]
}

const Map: FC<MapProps> = ({ locations, onMarkerClick }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map>()

    const handleMarkerClick = (options: MarkerProps): void => {
        if (options.position) {
            map?.setCenter(options.position)
            map?.setZoom(8)
        }

        onMarkerClick(options)
    }

    useEffect(() => {
        if (ref.current && !map) {
            setMap(
                new window.google.maps.Map(ref.current, {
                    center: {
                        lat: 15.2241818,
                        lng: -87.3305304,
                    },
                    zoom: 6,
                    styles: MapStyles,
                })
            )
        }
    }, [ref, map])

    const paths = new google.maps.Polyline({
        path: locations.map((location) => {
            return {
                lat: location.coords.lat,
                lng: location.coords.lng,
            }
        }),
        geodesic: true,
        strokeColor: '#f3936d',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        draggable: false,
    })
    // @ts-ignore
    paths.setMap(map)

    return (
        <>
            <div ref={ref} className="w-full h-[400px]" />
            {locations.map((location: ILocation, index: number) => {
                // set the map prop on the child component
                return cloneElement(
                    <Marker
                        key={location._id}
                        position={{
                            lat: location.coords.lat,
                            lng: location.coords.lng,
                        }}
                        icon={{
                            url:
                                location.arrived || index === 0
                                    ? 'images/MarkerActive.png'
                                    : 'images/Marker.png',
                            scaledSize: new google.maps.Size(25, 34),
                        }}
                        clickable={true}
                        id={location._id}
                        onClick={handleMarkerClick}
                    />,
                    { map }
                )
            })}
        </>
    )
}

export default Map

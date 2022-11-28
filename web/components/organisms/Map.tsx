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

    const visitedLocations = locations.filter((loc) => loc.arrived)
    const unvisitedLocations = locations.filter((loc) => !loc.arrived)

    if (visitedLocations.length > 0) {
        const visitedPaths = new google.maps.Polyline({
            path: visitedLocations.map((location) => {
                return {
                    lat: location.coords.lat,
                    lng: location.coords.lng,
                }
            }),
            geodesic: true,
            strokeColor: '#f3936d',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            draggable: false,
        })

        // @ts-ignore
        visitedPaths.setMap(map)
    }

    if (unvisitedLocations.length > 0) {
        const unvisitedPaths = new google.maps.Polyline({
            path: unvisitedLocations.map((location) => {
                return {
                    lat: location.coords.lat,
                    lng: location.coords.lng,
                }
            }),
            geodesic: true,
            strokeColor: '#333333',
            strokeOpacity: 0.4,
            strokeWeight: 3,
            draggable: false,
        })

        // @ts-ignore
        unvisitedPaths.setMap(map)
    }

    const currentLocation =
        visitedLocations.length > 0
            ? visitedLocations[visitedLocations.length - 1]
            : null

    const nextLocation =
        unvisitedLocations.length > 0 ? unvisitedLocations[0] : null

    if (currentLocation && nextLocation) {
        const nextPath = new google.maps.Polyline({
            path: [
                {
                    lat: currentLocation.coords.lat,
                    lng: currentLocation.coords.lng,
                },
                {
                    lat: nextLocation.coords.lat,
                    lng: nextLocation.coords.lng,
                },
            ],
            geodesic: true,
            strokeColor: '#333333',
            strokeOpacity: 0.4,
            strokeWeight: 3,
            draggable: false,
        })

        // @ts-ignore
        nextPath.setMap(map)
    }

    return (
        <>
            <div ref={ref} className="w-full h-[400px]" />
            {locations.map((location: ILocation, index: number) => {
                const isCurrent = currentLocation
                    ? location._id === currentLocation._id
                    : index === 0

                // set the map prop on the child component
                return cloneElement(
                    <Marker
                        key={location._id}
                        position={{
                            lat: location.coords.lat,
                            lng: location.coords.lng,
                        }}
                        icon={{
                            url: isCurrent
                                ? 'images/MarkerActive.png'
                                : 'images/Marker.png',
                            scaledSize: new google.maps.Size(
                                isCurrent ? 37 : 25,
                                isCurrent ? 51 : 34
                            ),
                        }}
                        opacity={location.arrived ? 1 : 0.7}
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

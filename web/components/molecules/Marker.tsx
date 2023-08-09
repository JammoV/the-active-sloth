'use client'

import type { FC } from 'react'
import { useState, useEffect } from 'react'

export interface MarkerProps extends google.maps.MarkerOptions {
    id: string
    onClick: (options: MarkerProps) => void
}

const Marker: FC<MarkerProps> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>()

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker())
        }

        return () => {
            if (marker) {
                marker.setMap(null)
            }
        }
    }, [marker])

    useEffect(() => {
        if (marker) {
            marker.setOptions(options)
            marker.addListener('click', () => options.onClick(options))
        }
    }, [marker, options])

    return null
}

export default Marker

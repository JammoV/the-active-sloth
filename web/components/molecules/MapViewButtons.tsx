import { faMapLocationDot, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FC } from 'react'

import MapViewButton from '@/atoms/MapViewButton'

interface MapViewButtonsProps {
    onClick: (mapView: boolean) => void
    activeView: 'list' | 'map'
}

const MapViewButtons: FC<MapViewButtonsProps> = ({ onClick, activeView }) => {
    return (
        <div className="flex flex-row gap-2">
            <MapViewButton
                onClick={(): void => onClick(false)}
                active={activeView === 'list'}
            >
                <FontAwesomeIcon icon={faList} />
                <span>Lijst weergave</span>
            </MapViewButton>
            <MapViewButton
                onClick={(): void => onClick(true)}
                active={activeView === 'map'}
            >
                <FontAwesomeIcon icon={faMapLocationDot} />
                <span>Kaart weergave</span>
            </MapViewButton>
        </div>
    )
}

export default MapViewButtons

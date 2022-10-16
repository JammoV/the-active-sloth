import type { FC, ReactNode } from 'react'

interface MapViewButtonProps {
    onClick: () => void
    active: boolean
    children: ReactNode
}

const MapViewButton: FC<MapViewButtonProps> = ({
    onClick,
    active,
    children,
}) => {
    return (
        <div
            onClick={onClick}
            className={`flex flex-row justify-between items-center gap-1 border rounded-xl py-1 px-2 text-sm cursor-pointer ${
                active
                    ? 'border-green-primary bg-green-primary text-white'
                    : 'border-gray-400 text-gray-400'
            }`}
        >
            {children}
        </div>
    )
}

export default MapViewButton

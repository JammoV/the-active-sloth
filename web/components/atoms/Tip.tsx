import Image from 'next/image'
import type { FC } from 'react'

enum Type {
    GENERAL = 'general',
    FOOD = 'food',
    DRINKS = 'drinks',
    ACTIVITY = 'activity',
    ACCOMMODATION = 'accommodation',
}

type TipMap = {
    [key: string]: {
        src: string
        width: number
        height: number
    }
}

const tipMap: TipMap = {
    [Type.GENERAL]: {
        src: '/images/icons/tip_general.png',
        width: 48,
        height: 45,
    },
    [Type.FOOD]: {
        src: '/images/icons/tip_food.png',
        width: 48,
        height: 37,
    },
    [Type.DRINKS]: {
        src: '/images/icons/tip_drinks.png',
        width: 48,
        height: 44,
    },
    [Type.ACTIVITY]: {
        src: '/images/icons/tip_activity.png',
        width: 56,
        height: 44,
    },
    [Type.ACCOMMODATION]: {
        src: '/images/icons/tip_accommodation.png',
        width: 48,
        height: 37,
    }
}

export interface TipProps {
    type: Type
    text: string
}

const Tip: FC<TipProps> = ({ text, type }) => {
    const tipConfig = tipMap[type]

    return (
        <div className="flex ml-2 mt-4 mb-8 items-center">
            <div className={`min-w-[50px]`}>
                <Image
                    src={tipConfig.src}
                    width={tipConfig.width}
                    height={tipConfig.height}
                />
            </div>
            <div className={`ml-4 m-h-[40px]`}>{text}</div>
        </div>
    )
}

export default Tip

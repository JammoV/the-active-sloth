import Image from 'next/image'
import type { FC } from 'react'

interface WavesProps {
    imgSources: string[]
}

const Waves: FC<WavesProps> = ({ imgSources }) => (
    <div className="relative w-full h-full">
        {imgSources.map((imgSource) => (
            <Image
                src={imgSource}
                key={imgSource}
                style={{
                    objectFit: 'cover',
                }}
                alt="Decorative wave"
                fill={true}
            />
        ))}
    </div>
)

export default Waves

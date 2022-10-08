import type { FC } from 'react'
import Image from 'next/image'
import Container from '@/atoms/Container'
import React from 'react'

const Footer: FC = () => {
    return (
        <>
            <div className="relative w-full h-16 md:h-28">
                <div className="absolute bottom-0 h-16 md:h-28 w-full bg-sand">
                    <Image
                        src="/images/waves/wave_footer.svg"
                        layout={'fill'}
                        objectFit={'cover'}
                        objectPosition={'center'}
                    />
                </div>
            </div>
            <div className="bg-green-primary text-white">
                <Container>
                    <div className="pb-8">
                        <h2 className="font-merienda text-center">
                            The Active Sloth © 2022
                        </h2>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer

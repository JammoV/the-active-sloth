import type { FC } from 'react'
import React from 'react'

import Container from '@/atoms/Container'
import Waves from '@/molecules/Waves'

const Footer: FC = () => {
    return (
        <>
            <div className="relative w-full h-16 md:h-28">
                <div className="absolute bottom-0 h-16 md:h-28 w-full bg-sand">
                    <Waves imgSources={['/images/waves/wave_footer.svg']} />
                </div>
            </div>
            <div className="bg-green-primary text-white">
                <Container>
                    <div className="pb-8">
                        <h2 className="font-merienda text-center">
                            The Active Sloth © 2023
                        </h2>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer

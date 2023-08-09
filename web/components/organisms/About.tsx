import Image from 'next/image'
import type { FC } from 'react'

const About: FC = () => {
    return (
        <div className="flex flex-col md:flex-row md:justify-center mt-8 mb-12 relative">
            <div className="flex flex-col align-middle justify-center items-center md:items-end">
                <span className="bg-green-primary text-white font-merienda drop-shadow-sm font-bold text-2xl py-2 pl-8 pr-10 text-right mb-2">
                    The Active Sloth
                </span>
                <p className="max-w-xs text-center md:text-right md:pr-10 mb-0">
                    Welkom op The Active Sloth!
                    <br /> Ik ben Eline en de verhalenschrijfster achter deze
                    website. Je vindt hier alles wat met reizen te maken heeft:
                    van stedentrips tot verre reizen.
                </p>
            </div>
            <div className="drop-shadow-md relative mt-8 md:mt-0">
                <div className="relative text-center">
                    <Image
                        src="/images/Eline.png"
                        style={{
                            width: '252px',
                            height: 'auto',
                        }}
                        width={419}
                        height={578}
                        alt="Eline: The Active Sloth"
                    />
                    <div className="hidden md:block md:absolute md:-bottom-[27px] md:-right-[27px]">
                        <Image
                            src="/images/LogoSmallStrik.png"
                            width={73}
                            height={74}
                            alt="Eline: The Active Sloth"
                            className="absolute"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About

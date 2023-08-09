import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

const HeaderLogo: FC = () => {
    return (
        <div className="relative md:w-[180px] md:h-[190px] md:flex-none">
            <div className="hidden md:block md:absolute bg-sandy md:top-4 md:p-4 rounded-full z-20">
                <Link href={'/'}>
                    <Image
                        src="/images/LogoWithTextBlush.png"
                        width={166.4}
                        height={179.4}
                        alt="Back to home"
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <div className="md:hidden">
                <Link href={'/'}>
                    <Image
                        src="/images/LogoSmall.png"
                        width={73}
                        height={74}
                        alt="Back to home"
                        className="cursor-pointer"
                    />
                </Link>
            </div>
        </div>
    )
}

export default HeaderLogo

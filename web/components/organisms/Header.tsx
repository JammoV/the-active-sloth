import { faPassport, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import type { FC } from 'react'

import HeaderLink from '@/molecules/HeaderLink'
import HeaderLogo from '@/molecules/HeaderLogo'

const Header: FC = () => {
    return (
        <div className="pt-2">
            <div className="flex flex-row justify-center text-center">
                <HeaderLink
                    href={'/posts'}
                    icon={faPassport}
                    title="Reis"
                    subTitle="ARTIKELEN"
                />
                <HeaderLogo />
                <HeaderLink
                    href={'/travel'}
                    icon={faMapMarkerAlt}
                    title="Reis"
                    subTitle="BLOG"
                />
            </div>
            <div className="w-full bg-orange mt-2 h-2 md:mt-0 md:h-10"></div>
        </div>
    )
}

export default Header

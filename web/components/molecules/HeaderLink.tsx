import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import type { FC } from 'react'

interface HeaderLinkProps {
    href: string
    icon: IconDefinition
    title: string
    subTitle: string
}

const HeaderLink: FC<HeaderLinkProps> = ({ href, icon, subTitle, title }) => {
    return (
        <Link
            href={href}
            className="flex-1 flex flex-col justify-center items-center hover:underline md:flex-none md:w-52 md:pt-12"
        >
            <FontAwesomeIcon
                icon={icon}
                className="hidden pt-6 pb-1 text-xl"
                size="1x"
            />
            <span className="font-bold text-lg">{title}</span>
            <span className="text-sm ">{subTitle}</span>
        </Link>
    )
}

export default HeaderLink

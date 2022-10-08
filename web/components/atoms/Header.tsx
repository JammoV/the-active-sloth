import type { FC, ReactNode } from 'react'

interface HeaderProps {
    type: HeaderType
    children: ReactNode
}

const Header: FC<HeaderProps> = ({ type, children }) => {
    if (type === HeaderType.H1) {
        return <h1>{children}</h1>
    }
    if (type === HeaderType.H2) {
        return (
            <h2 className={`text-2xl font-merienda font-bold mt-12 mb-4`}>{children}</h2>
        )
    }
    if (type === HeaderType.H3) {
        return (
            <h3 className={`text-xl font-medium my-2`}>{children}</h3>
        )
    }
    if (type === HeaderType.H4) {
        return <h4 className={`text-lg font-medium pt-4 pb-2`}>{children}</h4>
    }

    return <span>{children}</span>
}

export default Header

export enum HeaderType {
    H1,
    H2,
    H3,
    H4,
}

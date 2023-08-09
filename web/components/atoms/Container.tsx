import type { FC, ReactNode } from 'react'

export enum PageType {
    DEFAULT,
    BLOGPOST,
}

interface ContainerProps {
    children: ReactNode
    pageType?: PageType
}

const Container: FC<ContainerProps> = ({
    children,
    pageType = PageType.DEFAULT,
}) => (
    <div
        className={`px-4 mx-auto ${
            pageType === PageType.DEFAULT ? 'max-w-[900px]' : 'max-w-[1200px]'
        }`}
    >
        {children}
    </div>
)

export default Container

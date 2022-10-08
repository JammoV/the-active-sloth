import type { FC } from 'react'

interface CenteredHeaderProps {
    title: string
}

const CenteredHeader: FC<CenteredHeaderProps> = ({ title }) => (
    <div className="font-roboto font-medium text-3xl text-grey text-center">
        {title}
    </div>
)

export default CenteredHeader

import type { FC, ReactNode } from 'react'

interface BlockQuoteProps {
    children: ReactNode
}

const BlockQuote: FC<BlockQuoteProps> = ({ children }) => {
    return (
        <div className={`bg-sand border-l-4 p-4 my-4 border-orange mb-8`}>
            {children}
        </div>
    )
}

export default BlockQuote

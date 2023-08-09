import Link from 'next/link'
import type { FC } from 'react'

interface IHeader {
    level: string
    text: string
    identifier: string
}

interface TableOfContentsProps {
    headers: IHeader[]
}

const TableOfContents: FC<TableOfContentsProps> = ({ headers }) => {
    return (
        <div className="mb-4 p-4 flex flex-col border gap-1">
            <span className="font-merienda text-xl font-bold">Inhoud</span>
            {headers.map((header) => (
                <Link
                    href={`#${header.identifier}`}
                    key={header.identifier}
                    className={`text-green-primary hover:underline ${
                        header.level === 'h3' ? 'pl-4 text-sm' : ''
                    }`}
                >
                    {header.text}
                </Link>
            ))}
        </div>
    )
}

export default TableOfContents

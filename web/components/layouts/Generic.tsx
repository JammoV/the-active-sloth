import type { FC, ReactNode } from 'react'
import React from 'react'

import Header from '@/organisms//Header'
import Footer from '@/organisms/Footer'

interface LayoutGenericProps {
    children: ReactNode
}

const Generic: FC<LayoutGenericProps> = ({ children }) => (
    <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
    </div>
)

export default Generic

import { Roboto, Merienda } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'
import type { FC, ReactNode } from 'react'
import React from 'react'
import './global.css'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500'],
    variable: '--font-roboto',
    display: 'swap',
})

const merienda = Merienda({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-merienda',
    display: 'swap',
})

import Footer from '@/organisms/Footer'
import Header from '@/organisms/Header'

interface LayoutProps {
    children: ReactNode
}

const RootLayout: FC<LayoutProps> = ({ children }) => (
    <html lang="nl">
        <body className={`${roboto.variable} ${merienda.variable}`}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </body>
        <Analytics />
    </html>
)

export default RootLayout

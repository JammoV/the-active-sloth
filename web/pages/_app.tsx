import '../styles/global.css'
import { Wrapper } from '@googlemaps/react-wrapper'
import { Analytics } from '@vercel/analytics/react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout): ReactNode {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page): ReactNode => page)

    return getLayout(
        <Wrapper apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}>
            <Component {...pageProps} />
            <Analytics />
        </Wrapper>
    )
}

export default App

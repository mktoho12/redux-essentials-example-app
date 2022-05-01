import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from "react-redux"
import store from "../app/store"
import DefaultLayout from '../components/layout/DefaultLayout'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  )
}

export default MyApp

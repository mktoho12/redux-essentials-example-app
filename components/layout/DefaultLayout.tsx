import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../Navbar'

type Props = PropsWithChildren<{}>

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Navbar />
      {children}
    </>
  )
}

export default DefaultLayout

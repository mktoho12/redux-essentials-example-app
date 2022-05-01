import Head from 'next/head'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Navbar } from '../Navbar'
import GHCorner from 'react-gh-corner'

type Props = PropsWithChildren<{}>

const DefaultLayout: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Head>
        <title>Redux Essentials Example</title>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Navbar />
      {children}

      {mounted && (
        <GHCorner
          position="top-right"
          href="https://github.com/mktoho12/redux-essentials-example-app"
          bgColor="black"
          size={80}
        />
      )}
    </>
  )
}

export default DefaultLayout

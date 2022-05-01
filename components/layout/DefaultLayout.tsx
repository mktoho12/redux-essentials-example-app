import Head from 'next/head'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { Navbar } from '../Navbar'
import GithubCorner from '../button/GithubCorner'

type Props = PropsWithChildren<{}>

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Redux Essentials Example</title>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta property="og:title" content="Try Redux Essentials" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://redux-essentials.mktoho.dev/"
        />
        <meta
          property="og:image"
          content="https://redux-essentials.mktoho.dev/og.png"
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon shortcut" href="/favicon-32x32.png" sizes="3232" />
        <link rel="apple-touch-icon" href="/favicon-192x192.png" />
      </Head>

      <Navbar />
      {children}

      <GithubCorner
        href="https://github.com/mktoho12/redux-essentials-example-app"
        bgColor="white"
        color="#764abc"
        size={100}
      />
    </>
  )
}

export default DefaultLayout

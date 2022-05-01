import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../Navbar'
import GitHubCorners from '@uiw/react-github-corners'

type Props = PropsWithChildren<{}>

const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Redux Essentials Example</title>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <Navbar />
      {children}

      <GitHubCorners
        position="right"
        href="https://github.com/mktoho12/redux-essentials-example-app"
        bgColor="white"
        color="#764abc"
      />
    </>
  )
}

export default DefaultLayout
